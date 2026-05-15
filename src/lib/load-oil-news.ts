import { coerceNewsArticles } from "./coerce-news-articles";
import type { NewsArticle } from "./news-types";

async function fetchFromApiRoute(): Promise<NewsArticle[]> {
  const response = await fetch("/api/oil-news", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("News API unavailable");
  }

  const payload: unknown = await response.json();
  return coerceNewsArticles(payload);
}

export async function loadOilNews(
  fetchFromServer: () => Promise<unknown>,
): Promise<NewsArticle[]> {
  try {
    const fromServer = await fetchFromServer();
    const articles = coerceNewsArticles(fromServer);

    if (articles.length > 0) {
      return articles;
    }

    if (Array.isArray(fromServer)) {
      return articles;
    }
  } catch {
    /* try HTTP fallback (e.g. static Vercel hosting) */
  }

  try {
    return await fetchFromApiRoute();
  } catch {
    throw new Error("News API unavailable");
  }
}
