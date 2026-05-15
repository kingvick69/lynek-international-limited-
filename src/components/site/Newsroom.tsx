import { Component, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import fallbackImg from "@/assets/news-1.jpg";
import { NewsroomSlider } from "@/components/site/NewsroomSlider";
import { FALLBACK_OIL_NEWS } from "@/lib/fallback-oil-news";
import { getOilNews } from "@/lib/get-oil-news";
import { loadOilNews } from "@/lib/load-oil-news";
import type { NewsArticle } from "@/lib/news-types";

const ease = [0.2, 0.7, 0.2, 1] as const;
const STALE_MS = 24 * 60 * 60 * 1000;

function formatArticleDate(iso: string) {
  const parsed = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(parsed.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay: index * 0.06 }}
      className="group flex flex-col h-full border border-rule bg-paper shadow-[var(--shadow-card)] overflow-hidden transition-colors hover:border-ink/15"
    >
      <div className="relative overflow-hidden aspect-[16/10] shrink-0">
        <img
          src={article.imageUrl ?? fallbackImg}
          alt=""
          width={1024}
          height={640}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <time
            dateTime={article.publishedAt}
            className="font-mono text-[11px] uppercase tracking-widest text-ink-3"
          >
            {formatArticleDate(article.publishedAt)}
          </time>
          <span className="inline-flex border border-rule bg-muted/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">
            {article.category}
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl lg:text-[1.35rem] leading-snug text-ink transition-colors group-hover:text-primary-bright">
          {article.title}
        </h3>
        <p className="mt-3 text-ink-2 text-[15px] leading-relaxed flex-1 line-clamp-3">
          {article.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
          Read full article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        {article.sourceName ? (
          <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
            {article.sourceName}
          </span>
        ) : null}
      </div>
    </motion.a>
  );
}

function NewsSkeleton() {
  return (
    <div
      className="flex flex-col h-full border border-rule bg-paper overflow-hidden animate-pulse"
      aria-hidden
    >
      <div className="aspect-[16/10] bg-muted" />
      <div className="flex flex-col flex-1 gap-3 p-5 sm:p-6 lg:p-7">
        <div className="h-3 w-24 bg-muted rounded" />
        <div className="h-6 w-full bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
      </div>
    </div>
  );
}

function SliderSkeleton() {
  return (
    <div
      className="min-h-[clamp(22rem,62vh,36rem)] w-full animate-pulse border border-rule bg-muted"
      aria-hidden
    />
  );
}

function NewsroomContent() {
  const fetchNews = useServerFn(getOilNews);
  const { data, isPending } = useQuery({
    queryKey: ["oil-news"],
    queryFn: () => loadOilNews(() => fetchNews()),
    staleTime: STALE_MS,
    gcTime: STALE_MS,
    retry: false,
  });

  const isFallback = data?.source === "fallback";
  const articles = Array.isArray(data?.articles) ? data.articles : [];

  if (isPending) {
    return <SliderSkeleton />;
  }

  if (isFallback) {
    return (
      <NewsroomSlider
        articles={articles.length > 0 ? articles : FALLBACK_OIL_NEWS}
        showFallbackNote
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((article, i) => (
        <NewsCard key={article.id} article={article} index={i} />
      ))}
    </div>
  );
}

class NewsroomErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Newsroom]", error);
  }

  render() {
    if (this.state.hasError) {
      return <NewsroomSlider articles={FALLBACK_OIL_NEWS} showFallbackNote />;
    }
    return this.props.children;
  }
}

export function Newsroom() {
  return (
    <section id="newsroom" className="bg-paper py-20 sm:py-28 lg:py-32 xl:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6 mb-12 items-end sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="col-span-12 lg:col-span-2 overline text-ink-3"
          >
            06 — Newsroom
          </motion.div>
          <motion.div className="col-span-12 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease, delay: 0.1 }}
              className="font-display font-light text-balance text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-ink"
            >
              Latest oil &amp; gas industry news.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="mt-5 max-w-2xl text-pretty text-ink-2 text-[15px] leading-relaxed"
            >
              Curated headlines on oil, petroleum and upstream energy — refreshed daily from trusted
              publishers. Select a story to read the full article at the source.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="col-span-12 lg:col-span-3 lg:text-right"
          >
            <a href="/#contact" className="arrow-link text-ink">
              Media &amp; enquiries <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <NewsroomErrorBoundary>
          <NewsroomContent />
        </NewsroomErrorBoundary>
      </div>
    </section>
  );
}
