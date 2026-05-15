import { coerceNewsArticles } from "./coerce-news-articles";
import { FALLBACK_OIL_NEWS } from "./fallback-oil-news";
import type { NewsArticle } from "./news-types";

export type OilNewsResult = {
  articles: NewsArticle[];
  source: "live" | "fallback";
};

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

async function fetchLiveNews(
  fetchFromServer: () => Promise<unknown>,
): Promise<NewsArticle[]> {
  try {
    const fromServer = await fetchFromServer();
    const articles = coerceNewsArticles(fromServer);

    if (articles.length > 0) {
      return articles;
    }

    if (Array.isArray(fromServer) && fromServer.length === 0) {
      return [];
    }
  } catch {
    /* try HTTP fallback (e.g. static Vercel hosting) */
  }

  return fetchFromApiRoute();
}

export async function loadOilNews(
  fetchFromServer: () => Promise<unknown>,
): Promise<OilNewsResult> {
  try {
    const articles = await fetchLiveNews(fetchFromServer);
    if (articles.length > 0) {
      return { articles, source: "live" };
    }
  } catch {
    /* use curated fallback */
  }

  return { articles: FALLBACK_OIL_NEWS, source: "fallback" };
}
