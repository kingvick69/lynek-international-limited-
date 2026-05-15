import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { NewsArticle } from "@/lib/news-types";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

function formatArticleDate(iso: string) {
  const parsed = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(parsed.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function SlideCard({ article }: { article: NewsArticle }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full min-h-[clamp(22rem,62vh,36rem)] w-full flex-col justify-end overflow-hidden border border-rule bg-ink text-paper shadow-[var(--shadow-card)]"
    >
      <img
        src={article.imageUrl ?? undefined}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/15"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-10 lg:p-14 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <time
            dateTime={article.publishedAt}
            className="font-mono text-[11px] uppercase tracking-widest text-paper/70"
          >
            {formatArticleDate(article.publishedAt)}
          </time>
          <span className="inline-flex border border-paper/25 bg-paper/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/90 backdrop-blur-sm">
            {article.category}
          </span>
          {article.sourceName ? (
            <span className="font-mono text-[10px] uppercase tracking-widest text-paper/55">
              {article.sourceName}
            </span>
          ) : null}
        </div>
        <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.08] text-paper text-balance">
          {article.title}
        </h3>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-paper/80 sm:text-base line-clamp-3">
          {article.description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-paper">
          Read full story
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}

type NewsroomSliderProps = {
  articles: NewsArticle[];
  showFallbackNote?: boolean;
};

export function NewsroomSlider({ articles, showFallbackNote }: NewsroomSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setActive(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || articles.length < 2) return;

    const timer = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [api, articles.length]);

  return (
    <div className="space-y-6">
      {showFallbackNote ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Live feed unavailable — showing curated industry highlights
        </p>
      ) : null}

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {articles.map((article) => (
            <CarouselItem key={article.id} className="pl-0 basis-full">
              <SlideCard article={article} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {articles.map((article, i) => (
              <button
                key={article.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active ? "w-10 bg-primary-bright" : "w-3 bg-rule hover:bg-ink/25",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous story"
              className="inline-flex h-11 w-11 items-center justify-center border border-rule bg-paper text-ink transition-colors hover:border-ink/20 hover:bg-muted/50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next story"
              className="inline-flex h-11 w-11 items-center justify-center border border-rule bg-paper text-ink transition-colors hover:border-ink/20 hover:bg-muted/50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
