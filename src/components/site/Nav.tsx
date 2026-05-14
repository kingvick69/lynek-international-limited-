import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { Search, Globe, Menu, X, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import logo from "@/assets/lynek-logo.png";

/** Nigerian energy context: NGX oil & gas names, downstream marketers, and benchmarks (illustrative). */
const tickers = [
  { sym: "NGX O&G", name: "Oil & gas sector", price: "3,918.44", chg: "+28.06", up: true },
  { sym: "SEPLAT", name: "Seplat Energy", price: "2,920.00", chg: "+40.00", up: true },
  { sym: "OANDO", name: "Oando", price: "19.05", chg: "+0.25", up: true },
  { sym: "ARDOVA", name: "Ardova", price: "23.80", chg: "-0.20", up: false },
  { sym: "TOTAL", name: "TotalEnergies MK", price: "708.00", chg: "+4.90", up: true },
  { sym: "CONOIL", name: "Conoil", price: "115.50", chg: "+0.80", up: true },
  { sym: "ETERNA", name: "Eterna", price: "29.40", chg: "-0.15", up: false },
  { sym: "JAPAUL", name: "Japaul Gold", price: "2.14", chg: "+0.02", up: true },
  { sym: "BONNY", name: "Bonny Light", price: "$73.82", chg: "+0.71", up: true },
  { sym: "QUA IBOE", name: "Qua Iboe", price: "$75.05", chg: "+0.48", up: true },
  { sym: "BRENT", name: "Brent crude", price: "$79.40", chg: "+0.55", up: true },
  { sym: "USD/NGN", name: "Naira spot", price: "1,551.20", chg: "-3.40", up: false },
];

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Philosophy & objectives", href: "/#philosophy" },
  { label: "Founder", href: "/#founder" },
  { label: "Newsroom", href: "/#newsroom" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

/** Searchable index of pages, sections and services. */
const searchIndex = [
  { label: "Home", desc: "Lynek International — engineering practice", href: "/" },
  { label: "About", desc: "The vision behind Lynek International", href: "/#about" },
  { label: "Services", desc: "Full-spectrum engineering practice", href: "/#services" },
  { label: "Well Construction", desc: "Drilling support & completions", href: "/#services" },
  { label: "Well Intervention", desc: "Production restoration & optimisation", href: "/#services" },
  { label: "Well Shut Down", desc: "Isolation, suspension & abandonment", href: "/#services" },
  { label: "Instrumentation & Control", desc: "Engineering & commissioning", href: "/#services" },
  { label: "Operations Management", desc: "Field leadership & QA/QC", href: "/#services" },
  { label: "Asset Management", desc: "Integrity & lifecycle optimisation", href: "/#services" },
  { label: "Equipment Procurement & Logistics", desc: "Supply chain & field delivery", href: "/#services" },
  { label: "Oil Rig Waste Management", desc: "Environmental compliance", href: "/#services" },
  { label: "Capacity Development", desc: "Training & local content", href: "/#services" },
  { label: "Philosophy & objectives", desc: "How and why we operate", href: "/#philosophy" },
  { label: "Founder", desc: "Dr. Engr. Irivike Lucky Ewhuba", href: "/#founder" },
  { label: "Newsroom", desc: "Field record & updates", href: "/#newsroom" },
  { label: "Careers", desc: "Build a career with Lynek", href: "/careers" },
  { label: "Contact", desc: "Speak with the team", href: "/#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const solidNav = scrolled || pathname !== "/";
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  function openSearch() {
    setOpen(false);
    setQuery("");
    setSearchOpen(true);
  }

  const q = query.trim().toLowerCase();
  const results = q
    ? searchIndex.filter(
        (item) =>
          item.label.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q),
      )
    : searchIndex;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      {/* Ticker bar — slimmer on small screens to leave more room for content */}
      <div className="marquee overflow-hidden bg-ink text-paper/85 border-b border-white/10">
        <div className="marquee-track py-1.5 text-[10px] sm:py-2 sm:text-[11px] font-mono">
          {[...tickers, ...tickers].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 px-6 whitespace-nowrap">
              <span className="text-paper/55">{t.name}</span>
              <span className="font-semibold text-paper">{t.sym}</span>
              <span>{t.price}</span>
              <span className={`inline-flex items-center gap-0.5 ${t.up ? "text-up" : "text-down"}`}>
                {t.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {t.chg}
              </span>
              <span className="text-paper/20 ml-4">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-500 ${
          solidNav
            ? "bg-paper/90 backdrop-blur-xl border-b border-rule text-ink"
            : "bg-transparent text-paper"
        }`}
      >
        <div className="container-x flex min-h-14 sm:min-h-16 h-14 sm:h-16 items-center justify-between gap-3">
          <a href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src={logo}
              alt="Lynek International"
              className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
            />
            <span className="flex min-w-0 flex-col gap-0 sm:flex-row sm:items-baseline sm:gap-2.5">
              <span className="font-display text-lg tracking-tight font-medium sm:text-2xl">Lynek</span>
              <span className="overline hidden text-[10px] opacity-60 sm:inline sm:text-[11px]">
                International
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative text-[13px] font-medium tracking-tight"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <button
              type="button"
              aria-label="Search"
              onClick={openSearch}
              className="opacity-80 hover:opacity-100 transition"
            >
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Region" className="opacity-80 hover:opacity-100 transition inline-flex items-center gap-1.5 text-[12px] font-medium">
              <Globe className="h-4 w-4" /> EN / Nigeria
            </button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div
            id="mobile-nav"
            className="lg:hidden max-h-[min(70vh,28rem)] overflow-y-auto overscroll-y-contain border-t border-current/10 bg-paper text-ink shadow-lg"
          >
            <nav className="container-x flex flex-col py-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={openSearch}
                className="flex items-center gap-2 py-3.5 text-[15px] font-medium leading-snug border-b border-rule text-left active:bg-muted/50"
              >
                <Search className="h-4 w-4" /> Search
              </button>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-[15px] font-medium leading-snug border-b border-rule last:border-b-0 active:bg-muted/50"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="origin-left h-[2px] bg-primary-bright"
      />

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
          role="presentation"
        >
          <div
            className="container-x pt-[calc(5rem+env(safe-area-inset-top,0px))]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-rule bg-paper text-ink shadow-2xl">
              <div className="flex items-center gap-3 border-b border-rule px-4">
                <Search className="h-4 w-4 shrink-0 text-ink-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, sections and pages…"
                  className="min-h-12 w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-ink-3"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="shrink-0 text-ink-3 transition hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="max-h-[min(60vh,24rem)] overflow-y-auto py-1">
                {results.length === 0 ? (
                  <li className="px-4 py-6 text-[14px] text-ink-3">
                    No results for &ldquo;{query}&rdquo;.
                  </li>
                ) : (
                  results.map((item) => (
                    <li key={item.label + item.href}>
                      <a
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="group flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-muted/60"
                      >
                        <span className="min-w-0">
                          <span className="block text-[15px] font-medium text-ink">
                            {item.label}
                          </span>
                          <span className="block truncate text-[13px] text-ink-3">
                            {item.desc}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-ink-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
