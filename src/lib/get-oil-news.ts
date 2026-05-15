import { createServerFn } from "@tanstack/react-start";
import { fetchOilNews } from "@/lib/fetch-oil-news";
import type { NewsArticle } from "@/lib/news-types";

export const getOilNews = createServerFn({ method: "GET" }).handler(
  async (): Promise<NewsArticle[]> => {
    return fetchOilNews();
  },
);
