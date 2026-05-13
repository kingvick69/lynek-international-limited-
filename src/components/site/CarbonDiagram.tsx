import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Assess",
    body: "Reservoir review, well integrity diagnostics and job hazard analysis. Every intervention begins with rigorous engineering and HSSE planning.",
    detail: "IWCF · EWIL · International HSSE standards.",
  },
  {
    id: 2,
    title: "Mobilise",
    body: "Coordinated logistics, multidisciplinary crew briefing and equipment rig-up at the wellhead — onshore, swamp or shallow water.",
    detail: "Field readiness ≤ 72 hours typical.",
  },
  {
    id: 3,
    title: "Intervene",
    body: "Perforation extension, tubing integrity, gas-lift valve change-out, cement squeeze, water shut-off or coil tubing — executed under supervision.",
    detail: "Zero LTI target across all campaigns.",
  },
  {
    id: 4,
    title: "Restore",
    body: "Production restored, asset integrity verified, post-job reporting and handover. Sustained gains, measurable performance, documented results.",
    detail: "Verified by post-intervention production data.",
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

export function CarbonDiagram() {
  const [active, setActive] = useState(1);
  const current = steps.find((s) => s.id === active)!;

  return (
    <section className="relative bg-ink text-paper py-20 sm:py-28 lg:py-32 xl:py-40 overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6 mb-14 items-end sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="col-span-12 lg:col-span-2 overline text-paper/55"
          >
            03 — Method
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="col-span-12 lg:col-span-7 font-display font-light text-balance text-[clamp(2rem,4.5vw,4rem)] leading-[1.05]"
          >
            How we deliver well intervention.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="col-span-12 lg:col-span-3 lg:text-right text-paper/65 text-sm leading-relaxed"
          >
            An interactive look at the four-stage methodology behind every Lynek
            intervention campaign — proven across OML-30 assets.
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-7">
            <div className="relative px-1 sm:px-0">
              <div className="absolute top-7 left-4 right-4 h-px bg-paper/15 sm:left-7 sm:right-7" />
              <motion.div
                className="absolute top-7 left-4 right-4 h-px bg-primary-bright origin-left sm:left-7 sm:right-7"
                animate={{ scaleX: (active - 1) / (steps.length - 1) }}
                transition={{ duration: 0.6, ease }}
              />
              <div className="relative grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-4">
                {steps.map((s, i) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    onMouseEnter={() => setActive(s.id)}
                    className="group flex min-h-[44px] flex-col items-start gap-1 text-left sm:min-h-0"
                  >
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
                        active === s.id
                          ? "border-primary-bright bg-primary-bright text-ink scale-110"
                          : "border-paper/30 text-paper/70 group-hover:border-paper"
                      }`}
                    >
                      <span className="font-mono text-xs sm:text-sm">0{i + 1}</span>
                    </span>
                    <span
                      className={`mt-2 font-display text-base transition-colors sm:mt-5 sm:text-xl ${
                        active === s.id ? "text-paper" : "text-paper/60"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 border-t border-paper/15 pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:border-paper/15">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="overline text-primary-bright">Stage 0{current.id} of {steps.length}</div>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl">{current.title}</h3>
                <p className="mt-4 text-paper/75 text-[15px] leading-relaxed sm:mt-5 sm:text-[16px]">{current.body}</p>
                <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-paper/55">
                  {current.detail}
                </div>
                <button
                  onClick={() => setActive((a) => (a === steps.length ? 1 : a + 1))}
                  className="arrow-link mt-10 text-paper"
                >
                  Next stage <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
