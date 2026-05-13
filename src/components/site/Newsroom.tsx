import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import n1 from "@/assets/news-1.jpg";
import n2 from "@/assets/news-2.jpg";
import n3 from "@/assets/news-3.jpg";
import sustain from "@/assets/sustainability.jpg";
import e1 from "@/assets/employee-1.jpg";
import e2 from "@/assets/employee-2.jpg";

const articles = [
  {
    img: n1,
    category: "Field operations",
    date: "2026-01-14",
    title: "Multi-well intervention campaign restores production across Afiesere",
    desc: "Coordinated perforation extensions and tubing integrity work delivered measurable oil gains and sustained throughput.",
  },
  {
    img: n2,
    category: "Engineering",
    date: "2025-12-02",
    title: "Gas-lift valve change-outs and water shut-off across mature assets",
    desc: "Targeted intervention activities revitalise legacy wells with documented post-job performance gains.",
  },
  {
    img: n3,
    category: "Capacity",
    date: "2025-11-20",
    title: "Training the next generation of field engineers",
    desc: "Structured mentorship and on-asset exposure for young engineers and technicians across Lynek operations.",
  },
  {
    img: sustain,
    category: "Sustainability",
    date: "2025-10-08",
    title: "HSSE governance refresh ahead of winter campaign season",
    desc: "Updated JHA playbooks, toolbox talks and IWCF-aligned well control drills across OML-30 locations.",
  },
  {
    img: e1,
    category: "Company",
    date: "2025-09-30",
    title: "Operations leadership reinforces QA/QC on high-risk workscopes",
    desc: "Independent verification steps and digital job packs reduce variance on simultaneous operations.",
  },
  {
    img: e2,
    category: "Community",
    date: "2025-08-12",
    title: "Local content: STEM outreach with Niger Delta technical schools",
    desc: "Hands-on instrumentation modules and career pathways for students entering the energy workforce.",
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
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
          <div className="col-span-12 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease, delay: 0.1 }}
              className="font-display font-light text-balance text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-ink"
            >
              Latest updates from the field.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="mt-5 max-w-2xl text-pretty text-ink-2 text-[15px] leading-relaxed"
            >
              Press notices, campaign milestones and programme news — curated for partners, operators and communities
              we serve.
            </motion.p>
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((a, i) => (
            <motion.a
              key={`${a.title}-${a.date}`}
              href="/#contact"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.06 }}
              className="group flex flex-col h-full border border-rule bg-paper shadow-[var(--shadow-card)] overflow-hidden transition-colors hover:border-ink/15"
            >
              <div className="relative overflow-hidden aspect-[16/10] shrink-0">
                <img
                  src={a.img}
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
                    dateTime={a.date}
                    className="font-mono text-[11px] uppercase tracking-widest text-ink-3"
                  >
                    {formatArticleDate(a.date)}
                  </time>
                  <span className="inline-flex border border-rule bg-muted/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">
                    {a.category}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl lg:text-[1.35rem] leading-snug text-ink transition-colors group-hover:text-primary-bright">
                  {a.title}
                </h3>
                <p className="mt-3 text-ink-2 text-[15px] leading-relaxed flex-1">{a.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Read update
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
