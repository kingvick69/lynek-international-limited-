import { motion } from "motion/react";
import { ArrowUpRight, Briefcase, Phone } from "lucide-react";

const ease = [0.2, 0.7, 0.2, 1] as const;

const officePhone = "07055742773";

const pillars = [
  {
    title: "Discipline",
    body: "IWCF-aligned well control, rigorous JHAs and QA/QC — non-negotiable in how we work.",
  },
  {
    title: "Field craft",
    body: "Real asset exposure across Niger Delta operations — not desk-only engineering.",
  },
  {
    title: "Growth",
    body: "Mentorship and structured technical depth for engineers who want long careers in energy.",
  },
];

export function Careers() {
  return (
    <>
      <section className="border-b border-rule bg-paper pb-16 pt-[calc(6.5rem+env(safe-area-inset-top,0px))] sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-36">
        <div className="container-x">
          <div className="grid grid-cols-12 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="col-span-12 lg:col-span-5"
            >
              <div className="overline text-ink-3">Careers</div>
              <h1 className="mt-6 font-display font-light text-balance text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-ink">
                Build a career where precision meets the wellhead.
              </h1>
              <p className="mt-6 text-pretty text-ink-2 text-[15px] leading-relaxed max-w-md">
                Lynek is a field-led engineering practice. When we hire, we look for people who thrive in
                high-accountability environments — and who share our standard for integrity and execution.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.12 }}
              className="col-span-12 lg:col-span-7"
            >
              <div className="border border-rule bg-paper p-5 shadow-[var(--shadow-card)] sm:p-8 lg:p-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-rule text-ink">
                    <Briefcase className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl lg:text-3xl text-ink leading-tight">
                      No open positions right now
                    </h2>
                    <p className="mt-4 text-ink-2 text-[15px] leading-relaxed max-w-xl">
                      We are not advertising any roles at the moment. Openings will be listed here when
                      we recruit — typically for well intervention, instrumentation, operations and
                      technical support functions tied to our Niger Delta campaigns.
                    </p>
                    <p className="mt-4 text-ink-2 text-[15px] leading-relaxed max-w-xl">
                      If you would like us to keep your details for future opportunities, send a concise CV
                      and cover note via our contact channels and reference{" "}
                      <span className="font-mono text-[13px] text-ink">Careers — speculative</span> in the
                      subject line.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                      <a
                        href={`tel:${officePhone}`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 bg-ink px-5 text-[14px] font-medium text-paper transition hover:bg-ink/90"
                      >
                        <Phone className="h-4 w-4" /> Call the office
                      </a>
                      <a href="/#contact" className="arrow-link inline-flex text-ink">
                        Contact the office <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-28">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="max-w-2xl"
          >
            <div className="overline text-ink-3">What we value</div>
            <p className="mt-5 font-display font-light text-2xl lg:text-3xl text-ink leading-snug">
              The same qualities that define our projects define who succeeds alongside us.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-px bg-rule border border-rule md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease, delay: i * 0.08 }}
                className="bg-paper p-8 lg:p-10"
              >
                <div className="overline text-ink-3">{p.title}</div>
                <p className="mt-4 text-ink-2 text-[15px] leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
