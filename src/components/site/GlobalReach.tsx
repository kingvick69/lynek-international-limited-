import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import map from "@/assets/global-map.jpg";

const ease = [0.2, 0.7, 0.2, 1] as const;

const stats = [
  ["20+", "Years", "of field-proven engineering experience"],
  ["6", "OML-30 fields", "supervised across the Niger Delta"],
  ["100%", "HSSE focus", "IWCF & EWIL certified delivery"],
  ["1", "Standard", "international best practice, locally relevant"],
];

export function GlobalReach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mapY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const mapScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <motion.div style={{ y: mapY, scale: mapScale }} className="absolute inset-0">
        <img
          src={map}
          alt="Global operations map"
          width={1920}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover opacity-50"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />

      <div className="container-x relative py-32 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="overline text-paper/55"
        >
          05 — Track record
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="mt-6 max-w-3xl font-display font-light text-balance text-[clamp(2rem,4.5vw,4rem)] leading-[1.05]"
        >
          Anchored in the <em className="italic">Niger Delta</em>. Engineered for the world.
        </motion.h2>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/15 border border-paper/15">
          {stats.map(([n, l, sub], i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.08 }}
              className="bg-ink p-8 lg:p-10"
            >
              <div className="font-display text-5xl lg:text-6xl text-paper">{n}</div>
              <div className="mt-4 overline text-paper/65">{l}</div>
              <div className="mt-2 text-sm text-paper/55 leading-relaxed">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
