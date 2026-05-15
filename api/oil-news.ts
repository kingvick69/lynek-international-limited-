import { fetchOilNews } from "../src/lib/fetch-oil-news";

type VercelRequest = { method?: string };
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const articles = await fetchOilNews();
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");
    res.status(200).json(articles);
  } catch (error) {
    console.error("[api/oil-news]", error);
    res.status(503).json({ error: "News temporarily unavailable" });
  }
}
