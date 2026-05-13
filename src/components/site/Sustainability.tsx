import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import sustain from "@/assets/sustainability.jpg";

const ease = [0.2, 0.7, 0.2, 1] as const;

const objectives = [
  {
    v: "01",
    headline: "Excellence in delivery",
    body: "Establish a globally competitive organisation that reflects precision, reliability and excellence in every operation — engineering expertise combined with strong ethical values, discipline, safety consciousness and unwavering commitment to quality.",
  },
  {
    v: "02",
    headline: "Innovation & purpose",
    body: "Promote smarter, more efficient approaches to industrial operations. When technical knowledge is guided by purpose and integrity, it can transform industries and communities alike — not only corporate outcomes, but lasting value.",
  },
  {
    v: "03",
    headline: "People & capacity",
    body: "Create opportunities for young professionals, engineers and technicians through mentorship, structured guidance and exposure to high-level projects — a bridge between potential and achievement, sharpening skills and developing future industry leaders.",
  },
  {
    v: "04",
    headline: "National & economic impact",
    body: "Contribute to local content development, job creation and stronger technical capacity across the energy and engineering sectors — upholding international best practice while staying strongly relevant to Nigerian public and private sector partnerships.",
  },
  {
    v: "05",
    headline: "Legacy",
    body: "Measure greatness by impact, legacy and the ability to influence positive change. Lynek is conceived as a lifelong mission — a structure built to lead, transform and endure beyond any single career, inspiring excellence for generations.",
  },
];

export function Sustainability() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="philosophy" ref={ref} className="relative overflow-hidden bg-paper py-32 lg:py-40">
      <div className="container-x grid grid-cols-12 gap-6 lg:gap-12">
        <motion.div
          style={{ y: imgY }}
          className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start"
        >
          <div className="relative overflow-hidden">
            <motion.img
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
              src={sustain}
              alt="Energy operations and field environment"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full object-cover aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-paper">
              <div className="overline opacity-70">Field — Niger Delta</div>
              <div className="font-display text-2xl mt-2">Built to lead. Built to endure.</div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y }} className="col-span-12 lg:col-span-7 lg:pl-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="overline text-eco"
          >
            02 — Philosophy &amp; objectives
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="mt-6 font-display font-light text-balance text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-ink"
          >
            A legacy-driven institution. Engineered for <em className="italic">impact</em>, not headlines.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="mt-8 max-w-xl space-y-5 text-pretty text-[17px] leading-relaxed text-ink-2"
          >
            <p>
              The vision behind Lynek International was shaped through years of discipline, sacrifice and deep
              professional experience in oil, gas, engineering and industrial operations — leading complex well
              intervention projects and contributing to the growth of major energy organisations.
            </p>
            <p>
              Dr. Engr. Irivike Lucky Ewhuba developed a purpose that extended beyond personal success: the need for
              a platform that would deliver technical solutions and redefine how excellence, integrity and
              innovation are practiced. Lynek was conceived not merely as a business, but as a legacy-driven
              institution to solve real industrial challenges, create sustainable value and raise the standard of
              professional service delivery in Nigeria and beyond.
            </p>
          </motion.div>

          <ul className="mt-14 divide-y divide-rule border-y border-rule">
            {objectives.map((m, i) => (
              <motion.li
                key={m.v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}
                className="grid grid-cols-12 gap-6 py-7 items-baseline"
              >
                <div className="col-span-1 overline text-ink-3">0{i + 1}</div>
                <div className="col-span-4 lg:col-span-3 font-display text-4xl lg:text-5xl text-eco">{m.v}</div>
                <div className="col-span-7 lg:col-span-8">
                  <div className="font-display text-xl text-ink leading-snug">{m.headline}</div>
                  <p className="mt-3 text-ink-2 text-[15px] leading-relaxed">{m.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="/#founder"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.5 }}
            className="arrow-link mt-10 text-ink"
          >
            Meet the founder <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
