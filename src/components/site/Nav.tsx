import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { Search, Globe, Menu, X, ArrowUp, ArrowDown } from "lucide-react";
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

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Ticker bar */}
      <div className="marquee overflow-hidden bg-ink text-paper/85 border-b border-white/10">
        <div className="marquee-track py-2 text-[11px] font-mono">
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
        <div className="container-x flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Lynek International"
              className="h-9 w-9 object-contain"
            />
            <span className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl tracking-tight font-medium">Lynek</span>
              <span className="overline opacity-60">International</span>
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
            <button aria-label="Search" className="opacity-80 hover:opacity-100 transition">
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Region" className="opacity-80 hover:opacity-100 transition inline-flex items-center gap-1.5 text-[12px] font-medium">
              <Globe className="h-4 w-4" /> EN / Nigeria
            </button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-current/10 bg-paper text-ink">
            <nav className="container-x flex flex-col py-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-rule text-sm font-medium"
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
    </header>
  );
}
