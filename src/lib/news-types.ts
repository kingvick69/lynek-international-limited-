export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string | null;
  category: string;
  publishedAt: string;
  sourceName: string | null;
};

export type NewsApiResponse = {
  status: string;
  totalResults?: number;
  results?: NewsDataArticle[];
  message?: string;
};

export type NewsDataArticle = {
  article_id: string;
  title: string;
  description: string | null;
  link: string;
  image_url: string | null;
  category: string[] | null;
  pubDate: string;
  source_name?: string | null;
};
