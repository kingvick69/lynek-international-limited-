import heroImg from "@/assets/hero-platform.jpg";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import sustainImg from "@/assets/sustainability.jpg";
import type { NewsArticle } from "./news-types";

/**
 * Curated oil & gas headlines (May 2026) — shown when the live NewsData feed is unavailable.
 * Sources: CNBC, Bloomberg, U.S. EIA.
 */
export const FALLBACK_OIL_NEWS: NewsArticle[] = [
  {
    id: "fallback-brent-wti-iran",
    title: "Brent and WTI climb as Middle East supply risks intensify",
    description:
      "Crude benchmarks rallied amid escalating regional tensions and concern over Strait of Hormuz transit, with traders pricing in prolonged disruption to Gulf exports.",
    link: "https://www.cnbc.com/2026/05/12/oil-prices-today-brent-wti-trump-iran-war-hormuz.html",
    imageUrl: news1,
    category: "Markets",
    publishedAt: "2026-05-12",
    sourceName: "CNBC",
  },
  {
    id: "fallback-saudi-june-pricing",
    title: "Saudi Arabia trims June official selling prices from record premiums",
    description:
      "State producer Aramco lowered Arab Light OSPs as Asian refinery margins soften, signalling a shift after months of elevated differentials to regional benchmarks.",
    link: "https://www.bloomberg.com/news/articles/2026-05-05/saudi-arabia-cuts-oil-prices-for-june-from-record-high-premium",
    imageUrl: news2,
    category: "OPEC+",
    publishedAt: "2026-05-05",
    sourceName: "Bloomberg",
  },
  {
    id: "fallback-eia-outlook",
    title: "EIA revises outlook as Mideast disruption reshapes global balances",
    description:
      "The U.S. Energy Information Administration updated its supply and price forecasts and will publish new datasets on strategic stocks and shipping chokepoints.",
    link: "https://www.eia.gov/pressroom/releases/press588.php",
    imageUrl: sustainImg,
    category: "Policy",
    publishedAt: "2026-05-12",
    sourceName: "U.S. EIA",
  },
  {
    id: "fallback-opec-output-hike",
    title: "OPEC+ agrees modest June production increase of 188,000 bpd",
    description:
      "The alliance approved another incremental quota rise for June, continuing a gradual unwind of cuts while markets weigh geopolitical risk against added supply.",
    link: "https://www.cnbc.com/2026/05/03/opec-announces-188000-barrels-per-day-output-increase-.html",
    imageUrl: news3,
    category: "OPEC+",
    publishedAt: "2026-05-03",
    sourceName: "CNBC",
  },
  {
    id: "fallback-opec-quota-symbolic",
    title: "OPEC+ delegates back symbolic quota hike amid UAE investment push",
    description:
      "Ministers endorsed a limited June increase as members balance market share goals with price support, following heightened focus on Gulf capacity and investment.",
    link: "https://www.bloomberg.com/news/articles/2026-05-03/opec-agrees-to-symbolic-june-quota-increase-delegates-say",
    imageUrl: heroImg,
    category: "Industry",
    publishedAt: "2026-05-03",
    sourceName: "Bloomberg",
  },
  {
    id: "fallback-hormuz-supply",
    title: "Analysts warn Hormuz disruption could keep crude elevated through 2027",
    description:
      "Shipping and upstream advisers say prolonged chokepoint risk may sustain triple-digit Brent scenarios if Gulf loadings remain constrained into the second half of 2026.",
    link: "https://www.cnbc.com/2026/05/12/oil-prices-today-brent-wti-trump-iran-war-hormuz.html",
    imageUrl: news1,
    category: "Geopolitics",
    publishedAt: "2026-05-12",
    sourceName: "Industry analysis",
  },
];
