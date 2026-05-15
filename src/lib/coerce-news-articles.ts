import type { NewsArticle, NewsDataArticle } from "./news-types";

function isNewsArticle(value: unknown): value is NewsArticle {
  if (!value || typeof value !== "object") return false;
  const article = value as NewsArticle;
  return (
    typeof article.id === "string" &&
    typeof article.title === "string" &&
    typeof article.link === "string" &&
    typeof article.description === "string" &&
    typeof article.publishedAt === "string" &&
    typeof article.category === "string"
  );
}

function fromNewsDataRaw(raw: NewsDataArticle): NewsArticle | null {
  if (!raw.article_id || !raw.title || !raw.link) return null;

  const category =
    raw.category?.find((c) => c.trim().length > 0) ?? "Energy";

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

export function coerceNewsArticles(data: unknown): NewsArticle[] {
  if (data == null) return [];

  if (Array.isArray(data)) {
    return data.filter(isNewsArticle);
  }

  if (typeof data !== "object") return [];

  const record = data as Record<string, unknown>;

  if (Array.isArray(record.results)) {
    return record.results
      .map((item) =>
        isNewsArticle(item) ? item : fromNewsDataRaw(item as NewsDataArticle),
      )
      .filter((item): item is NewsArticle => item !== null);
  }

  if (Array.isArray(record.data)) {
    return coerceNewsArticles(record.data);
  }

  if (Array.isArray(record.articles)) {
    return coerceNewsArticles(record.articles);
  }

  return [];
}
