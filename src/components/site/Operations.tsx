import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import engine1 from "@/assets/engine 1.png";
import engine2 from "@/assets/engine 2.png";
import engine3 from "@/assets/engine 3.png";
import teamWorking from "@/assets/team working.png";

const items = [
  {
    n: "01",
    title: "Well Intervention",
    sub: "Production restoration & optimisation",
    body: "Perforation extensions, tubing integrity checks, gas-lift valve change-outs, cement squeeze, water shut-off and coil tubing operations across mature Niger Delta assets.",
    img: engine1,
    imgAlt: "Wellhead and valve assemblies staged for field operations",
    locations: "Afiesere · Eriemu · Olomoro · Kokori · Uzere · Evwreni",
  },
  {
    n: "02",
    title: "Instrumentation & Control",
    sub: "Engineering & Commissioning",
    body: "Design, installation and commissioning of remote monitoring systems, control loops and production facility instrumentation — IWCF and EWIL certified delivery.",
    img: engine2,
    imgAlt: "Industrial fittings and pressure hardware in workshop staging",
    locations: "Onshore · Swamp · Shallow water",
  },
  {
    n: "03",
    title: "Operations Management",
    sub: "Field leadership & QA/QC",
    body: "Multidisciplinary supervision, HSSE governance, job hazard analysis and rigorous quality assurance — engineered for high-risk environments where precision is non-negotiable.",
    img: engine3,
    imgAlt: "High-pressure manifold valve assembly prepared for deployment",
    locations: "OML-30 Assets · Heritage Energy",
  },
  {
    n: "04",
    title: "Capacity Development",
    sub: "Training & local content",
    body: "Mentorship, structured technical training and exposure to high-level projects — building the next generation of Nigerian engineers and technicians.",
    img: teamWorking,
    imgAlt: "Field technicians in PPE performing offshore equipment maintenance",
    locations: "Nigeria · West Africa",
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Operations() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-paper py-20 sm:py-28 lg:py-32 xl:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6 mb-16 sm:mb-20 lg:mb-28 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="col-span-12 lg:col-span-2 overline text-ink-3"
          >
            01 — Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="col-span-12 lg:col-span-7 font-display font-light text-balance text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-ink"
          >
            A full-spectrum engineering practice from wellhead to control room.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="col-span-12 lg:col-span-3 lg:text-right"
          >
            <a href="/#contact" className="arrow-link text-ink">
              Request Capability Statement <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-16 lg:mb-20"
        >
          <div className="overline text-ink-3 mb-3 sm:mb-4">Equipment &amp; field execution</div>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {items.map((it, i) => (
              <motion.div
                key={it.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.75, ease, delay: i * 0.06 }}
                className="group relative overflow-hidden border border-rule bg-paper"
              >
                <img
                  src={it.img}
                  alt={it.imgAlt}
                  width={640}
                  height={400}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div
          className="relative border-t border-rule"
          onMouseLeave={() => setHover(null)}
        >
          {items.map((it, i) => (
            <motion.a
              key={it.n}
              href="/#contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.06 }}
              onMouseEnter={() => setHover(i)}
              className="group relative grid grid-cols-1 gap-4 border-b border-rule py-8 sm:grid-cols-12 sm:gap-6 sm:py-10 lg:py-14"
            >
              <span className="pointer-events-none absolute inset-0 -z-0 origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100" />

              <div className="relative col-span-12 sm:col-span-2 lg:col-span-1 overline text-ink-3 transition-colors group-hover:text-paper/60">
                {it.n}
              </div>
              <div className="relative col-span-12 sm:col-span-10 lg:col-span-4">
                <h3 className="font-display text-2xl text-ink transition-colors group-hover:text-paper sm:text-3xl lg:text-5xl">
                  {it.title}
                </h3>
                <div className="mt-2 overline text-ink-3 transition-colors group-hover:text-paper/60">
                  {it.sub}
                </div>
              </div>
              <div className="relative col-span-12 lg:col-span-5 text-pretty text-ink-2 text-[14px] leading-relaxed transition-colors group-hover:text-paper/85 sm:text-[15px]">
                {it.body}
                <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink-3 transition-colors group-hover:text-paper/55">
                  {it.locations}
                </div>
              </div>
              <div className="relative col-span-12 lg:col-span-2 flex justify-start items-center text-ink transition-colors group-hover:text-paper lg:justify-end">
                <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </motion.a>
          ))}

          <div className="pointer-events-none absolute right-0 top-0 hidden lg:block w-[26rem] h-[18rem]">
            {items.map((it, i) => (
              <motion.img
                key={it.n}
                src={it.img}
                alt={it.imgAlt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: hover === i ? 1 : 0,
                  scale: hover === i ? 1 : 1.05,
                }}
                transition={{ duration: 0.5, ease }}
                style={{ top: `${i * 14 + 8}rem` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
