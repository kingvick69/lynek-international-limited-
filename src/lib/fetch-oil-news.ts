import { getNewsDataErrorMessage } from "./newsdata-errors";
import type { NewsApiResponse, NewsArticle, NewsDataArticle } from "./news-types";

const NEWSDATA_BASE = "https://newsdata.io/api/1/latest";
const MAX_ARTICLES = 20;
const OIL_QUERY =
  'oil OR petroleum OR "crude oil" OR "oil and gas" OR OPEC OR "oil price" OR upstream';

type DailyCache = {
  dateKey: string;
  articles: NewsArticle[];
};

let dailyCache: DailyCache | null = null;

function utcDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function getApiKey(): string | undefined {
  if (typeof process !== "undefined" && process.env?.NEWSDATA_API_KEY) {
    return process.env.NEWSDATA_API_KEY.trim();
  }
  try {
    const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
    return env?.NEWSDATA_API_KEY?.trim();
  } catch {
    return undefined;
  }
}

function normalizeArticle(article: NewsDataArticle): NewsArticle | null {
  if (!article.article_id || !article.title || !article.link) return null;

  const category =
    article.category?.find((c) => c.trim().length > 0) ?? "Energy";

  return {
    id: article.article_id,
    title: article.title.trim(),
    description: (article.description ?? "").trim() || "Read the full story at the source.",
    link: article.link,
    imageUrl: article.image_url?.trim() || null,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    publishedAt: article.pubDate,
    sourceName: article.source_name?.trim() || null,
  };
}

async function requestOilNews(size: number): Promise<NewsArticle[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("NEWSDATA_API_KEY is not configured.");
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    q: OIL_QUERY,
    language: "en",
    size: String(Math.min(size, 50)),
    removeduplicate: "1",
  });

  const response = await fetch(`${NEWSDATA_BASE}?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });

  const payload = (await response.json()) as NewsApiResponse;

  if (!response.ok || payload.status !== "success") {
    const detail =
      getNewsDataErrorMessage(payload) ?? response.statusText ?? "Failed to fetch oil news.";
    throw new Error(detail);
  }

  const rawResults = Array.isArray(payload.results) ? payload.results : [];
  const articles = rawResults
    .map(normalizeArticle)
    .filter((article): article is NewsArticle => article !== null)
    .slice(0, MAX_ARTICLES);

  return articles;
}

export async function fetchOilNews(): Promise<NewsArticle[]> {
  const dateKey = utcDateKey();

  if (dailyCache?.dateKey === dateKey) {
    return dailyCache.articles;
  }

  const articles = await requestOilNews(MAX_ARTICLES);
  dailyCache = { dateKey, articles };
  return articles;
}
