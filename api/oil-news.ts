/**
 * Vercel serverless route — self-contained (no imports from src/).
 * Set NEWSDATA_API_KEY in Vercel project → Settings → Environment Variables.
 */

const NEWSDATA_BASE = "https://newsdata.io/api/1/latest";
const MAX_ARTICLES = 20;
/** Free NewsData.io plans allow up to 10 results per request. */
const PAGE_SIZE = 10;
const OIL_QUERY = "oil OR petroleum OR OPEC OR crude";

type NewsArticle = {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string | null;
  category: string;
  publishedAt: string;
  sourceName: string | null;
};

type NewsDataArticle = {
  article_id?: string;
  title?: string;
  description?: string | null;
  link?: string;
  image_url?: string | null;
  category?: string[] | null;
  pubDate?: string;
  source_name?: string | null;
};

type NewsApiResponse = {
  status?: string;
  results?: NewsDataArticle[] | { message?: string; code?: string };
  message?: string;
  nextPage?: string;
};

type VercelRequest = { method?: string };
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

let dailyCache: { dateKey: string; articles: NewsArticle[] } | null = null;

function utcDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeArticle(raw: NewsDataArticle): NewsArticle | null {
  if (!raw.article_id || !raw.title || !raw.link || !raw.pubDate) return null;

  const category = raw.category?.find((c) => c.trim().length > 0) ?? "Energy";

  return {
    id: raw.article_id,
    title: raw.title.trim(),
    description: (raw.description ?? "").trim() || "Read the full story at the source.",
    link: raw.link,
    imageUrl: raw.image_url?.trim() || null,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    publishedAt: raw.pubDate,
    sourceName: raw.source_name?.trim() || null,
  };
}

function newsDataError(payload: NewsApiResponse, httpStatus: number): string {
  const nested =
    payload.results &&
    typeof payload.results === "object" &&
    !Array.isArray(payload.results)
      ? payload.results.message
      : undefined;
  return (
    (typeof payload.message === "string" && payload.message) ||
    nested ||
    `NewsData.io error (${httpStatus})`
  );
}

async function fetchNewsPage(
  apiKey: string,
  page?: string,
): Promise<{ articles: NewsArticle[]; nextPage?: string }> {
  const params = new URLSearchParams({
    apikey: apiKey,
    q: OIL_QUERY,
    language: "en",
    size: String(PAGE_SIZE),
    removeduplicate: "1",
  });
  if (page) params.set("page", page);

  const response = await fetch(`${NEWSDATA_BASE}?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });

  const payload = (await response.json()) as NewsApiResponse;

  if (!response.ok || payload.status !== "success") {
    throw new Error(newsDataError(payload, response.status));
  }

  const rawResults = Array.isArray(payload.results) ? payload.results : [];
  const articles = rawResults
    .map(normalizeArticle)
    .filter((article): article is NewsArticle => article !== null);

  return { articles, nextPage: payload.nextPage };
}

async function fetchOilNewsFromApi(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWSDATA_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("NEWSDATA_API_KEY is not configured on the server.");
  }

  const dateKey = utcDateKey();
  if (dailyCache?.dateKey === dateKey) {
    return dailyCache.articles;
  }

  const first = await fetchNewsPage(apiKey);
  const seen = new Set(first.articles.map((a) => a.id));
  const merged = [...first.articles];

  if (merged.length < MAX_ARTICLES && first.nextPage) {
    const second = await fetchNewsPage(apiKey, first.nextPage);
    for (const article of second.articles) {
      if (!seen.has(article.id)) {
        merged.push(article);
        seen.add(article.id);
      }
      if (merged.length >= MAX_ARTICLES) break;
    }
  }

  const articles = merged.slice(0, MAX_ARTICLES);
  dailyCache = { dateKey, articles };
  return articles;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== "GET" && req.method !== "HEAD") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (req.method === "HEAD") {
    res.status(200).json(null);
    return;
  }

  try {
    const articles = await fetchOilNewsFromApi();
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");
    res.status(200).json(articles);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/oil-news]", message);

    const code = message.includes("not configured")
      ? "missing_api_key"
      : /api key|unauthorized/i.test(message)
        ? "invalid_api_key"
        : "upstream_error";

    res.status(503).json({
      error: "News temporarily unavailable",
      code,
    });
  }
}
