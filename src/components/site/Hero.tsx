import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import hero from "@/assets/hero-platform.jpg";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-paper">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={hero}
          alt="Offshore platform at golden hour"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/40" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 container-x flex min-h-[100svh] flex-col justify-end pb-16 pt-[calc(7.25rem+env(safe-area-inset-top,0px))] sm:pb-24 sm:pt-32"
      >
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="flex items-center gap-4 overline text-paper/70"
            >
              <span className="h-px w-10 bg-paper/40" />
              <span>Lynek · International Limited</span>
            </motion.div>

            <h1 className="mt-5 font-display font-light leading-[0.98] text-[clamp(2rem,6.5vw,7rem)] text-balance sm:mt-7 sm:leading-[0.95]">
              {"Engineering the standard of Nigerian energy.".split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.06, ease }}
                  className="inline-block mr-[0.25em]"
                >
                  {w === "energy." ? <em className="font-display italic font-light text-paper/85">energy.</em> : w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease }}
              className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-paper/75 sm:mt-8 sm:text-base lg:text-[17px]"
            >
              A legacy-driven engineering institution delivering well intervention,
              instrumentation, and operations excellence across Nigeria's oil and gas
              fields. Built on discipline, integrity and decades of field-proven expertise.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease }}
            className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-5 lg:items-end"
          >
            <a href="/#operations" className="arrow-link text-paper hover:text-paper">
              Explore the company <ArrowRight className="h-4 w-4" />
            </a>
            <button className="group inline-flex items-center gap-3 text-sm font-medium text-paper/80 hover:text-paper transition">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/30 group-hover:border-paper transition">
                <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
              </span>
              <span className="text-left leading-tight">
                Watch the film
                <span className="block text-[11px] opacity-60 font-mono uppercase tracking-widest">02:48</span>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="mt-12 grid grid-cols-1 gap-6 border-t border-paper/15 pt-6 sm:mt-16 sm:grid-cols-2 sm:pt-8 lg:mt-20 lg:grid-cols-12 lg:items-end"
        >
          <div className="sm:col-span-1 lg:col-span-4">
            <div className="overline text-paper/55">Discipline</div>
            <div className="mt-2 font-mono text-xs leading-snug sm:text-sm">
              Well Intervention · Instrumentation · QA/QC
            </div>
          </div>
          <div className="sm:col-span-1 lg:col-span-4">
            <div className="overline text-paper/55">Operating across</div>
            <div className="mt-2 font-mono text-xs leading-snug sm:text-sm">OML-30 · Niger Delta · Nigeria</div>
          </div>
          <div className="sm:col-span-2 sm:text-left lg:col-span-4 lg:text-right">
            <div className="overline text-paper/55">Field experience</div>
            <div className="mt-2 font-display text-2xl sm:text-3xl">20+ yrs</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
