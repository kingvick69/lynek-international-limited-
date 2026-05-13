import { motion } from "motion/react";
import founderImg from "@/assets/employee-1.jpg";
import { ArrowUpRight } from "lucide-react";

const ease = [0.2, 0.7, 0.2, 1] as const;

const credentials = [
  {
    k: "HND",
    v: "Higher National Diploma, Instrumentation & Control Engineering — Petroleum Training Institute, Effurun",
  },
  {
    k: "B.Eng",
    v: "Bachelor of Engineering, Petroleum & Gas Engineering — University of Port Harcourt",
  },
  { k: "Doctorate", v: "Doctorate in Operations Management" },
  {
    k: "Certified",
    v: "International Well Control Forum (IWCF) · Electrical Wiring Installation License (EWIL)",
  },
];

const tenure = [
  "Heritage Energy Operational Services Limited",
  "Shell Petroleum Development Company",
  "Neconde Energy Nigeria Limited",
  "Salvic Petroleum Resources Limited",
  "Hyprops Nigeria Limited",
  "Petronella Nigeria Limited",
];

export function People() {
  return (
    <section id="founder" className="bg-paper py-32 lg:py-40">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-6 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="col-span-12 lg:col-span-2 overline text-ink-3"
          >
            04 — Founder
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="col-span-12 lg:col-span-7 font-display font-light text-balance text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-ink"
          >
            Two decades in the field. One uncompromising standard.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="col-span-12 lg:col-span-3 lg:text-right"
          >
            <a href="/#contact" className="arrow-link text-ink">
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease }}
          className="grid grid-cols-12 gap-6 lg:gap-12 items-start"
        >
          <div className="col-span-12 lg:col-span-5">
            <div className="relative overflow-hidden">
              <motion.img
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease }}
                src={founderImg}
                alt="Dr. Engr. Irivike Lucky Ewhuba"
                width={800}
                height={1024}
                loading="lazy"
                className="w-full object-cover aspect-[4/5]"
              />
            </div>
            <figcaption className="mt-6 border-t border-rule pt-5">
              <div className="font-display text-xl text-ink">Dr. Engr. Irivike Lucky Ewhuba</div>
              <div className="overline text-ink-3 mt-2">
                Founder · Well Intervention Superintendent, Heritage Energy Operational Services Limited
              </div>
            </figcaption>
          </div>

          <div className="col-span-12 lg:col-span-7" id="about">
            <div className="overline text-ink-3">About the founder</div>
            <blockquote className="mt-6 font-display font-light text-pretty text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] text-ink">
              <span className="text-ink-3 mr-1">&ldquo;</span>
              Greatness is achieved not by comfort, but through years of discipline,
              sacrifice, courage, and the willingness to rise above limitations.
              <span className="text-ink-3 ml-1">&rdquo;</span>
            </blockquote>

            <div className="mt-10 space-y-5 text-ink-2 text-[15px] leading-relaxed">
              <p>
                Dr. Engr. Irivike Lucky Ewhuba is a distinguished engineer, visionary leader and accomplished
                industry professional whose career in the oil and gas sector reflects resilience, innovation and
                unwavering dedication to excellence. For more than two decades he has applied deep expertise
                across petroleum engineering, well intervention, instrumentation and control, operational
                management, quality assurance and field leadership — turning technical complexity into measurable
                results and earning respect across the Nigerian energy industry.
              </p>
              <p>
                Born with a passion for growth and continuous learning, he built an educational foundation
                matched by internationally recognised certifications — proof that leadership, in his view, is
                rooted in ongoing development and mastery of craft.
              </p>
            </div>

            <div className="mt-12">
              <div className="overline text-ink-3">Well intervention &amp; production optimisation</div>
              <div className="mt-5 space-y-5 text-ink-2 text-[15px] leading-relaxed">
                <p>
                  His work has supported increased production, improved efficiency and long-term asset
                  sustainability across multiple Nigerian oil fields — from major wellhead maintenance campaigns
                  to perforation extensions, tubing integrity checks, gas-lift valve change-outs, cement squeeze
                  operations, water shut-off technologies and coil tubing interventions.
                </p>
                <p>
                  As Well Intervention Superintendent at Heritage Energy Operational Services Limited, he has led
                  critical operations across OML-30 assets on fields including Afiesere, Eriemu, Olomoro, Kokori,
                  Uzere and Evwreni — restoring wells, sustaining production growth and delivering substantial oil
                  gains through disciplined planning, supervision and coordination.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <div className="overline text-ink-3">HSSE, quality &amp; professional integrity</div>
              <p className="mt-5 text-ink-2 text-[15px] leading-relaxed">
                He is a champion of international HSSE standards — promoting lifesaving rules, risk assessment,
                job hazard analysis and safe operational practice in every organisation he has served. That
                discipline, combined with calm judgement under pressure, underpins how he leads multidisciplinary
                teams in high-risk environments where precision and accountability are paramount.
              </p>
            </div>

            <div className="mt-12">
              <div className="overline text-ink-3">Broader technical leadership</div>
              <p className="mt-5 text-ink-2 text-[15px] leading-relaxed">
                Across Shell Petroleum Development Company, Neconde Energy Nigeria Limited, Salvic Petroleum
                Resources Limited, Hyprops Nigeria Limited, Petronella Nigeria Limited and other engineering and
                energy firms, he has supervised remote monitoring installations, participated in commissioning
                production facilities, handled critical well servicing, managed field logistics and coordinated
                technical teams with consistency and professionalism.
              </p>
            </div>

            <div className="mt-10 space-y-5 text-ink-2 text-[15px] leading-relaxed border-t border-rule pt-10">
              <p>
                Beyond titles and certifications, his journey speaks to perseverance, vision and the belief that
                true success is built through dedication to excellence, commitment to learning and leading others
                with wisdom and integrity.
              </p>
              <p>
                Today he stands as more than an accomplished engineer: a legacy of impact, a reference for
                professional excellence, and an inspiration to aspiring engineers, entrepreneurs and future
                leaders shaping Nigeria&apos;s energy sector.
              </p>
            </div>

            <div className="mt-12">
              <div className="overline text-ink-3">Education &amp; certification</div>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {credentials.map((c) => (
                  <li key={c.k} className="grid grid-cols-12 gap-4 py-4">
                    <div className="col-span-3 lg:col-span-2 font-mono text-[11px] uppercase tracking-widest text-ink-3 pt-1">
                      {c.k}
                    </div>
                    <div className="col-span-9 lg:col-span-10 text-ink-2 text-[15px] leading-relaxed">{c.v}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <div className="overline text-ink-3">Career — selected organisations</div>
              <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {tenure.map((t, i) => (
                  <li key={t} className="flex items-baseline gap-3 text-ink-2 text-[15px]">
                    <span className="font-mono text-[11px] text-ink-3">0{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
