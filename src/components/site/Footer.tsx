import { motion } from "motion/react";
import { ArrowRight, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/lynek-logo.png";
import { ContactForm } from "@/components/site/ContactForm";

const phones = ["07055742773", "07072437336", "07011060586"];

const cols: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Services",
    links: [
      { label: "Well Intervention", href: "/#services" },
      { label: "Instrumentation & Control", href: "/#services" },
      { label: "Operations Management", href: "/#services" },
      { label: "QA / QC", href: "/#services" },
      { label: "Capacity Development", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Founder", href: "/#founder" },
      { label: "Philosophy & objectives", href: "/#philosophy" },
      { label: "Field Record", href: "/#newsroom" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Footer() {
  return (
    <footer id="contact" className="relative bg-ink text-paper">
      <div className="container-x py-16 sm:py-20 lg:py-28 xl:py-32">
        {/* Contact callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="grid grid-cols-12 gap-6 border-b border-paper/15 pb-12 sm:pb-16"
        >
          <div className="col-span-12 lg:col-span-7">
            <div className="overline text-paper/55">07 — Contact</div>
            <h3 className="mt-5 font-display font-light text-balance text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
              Speak with the team. <em className="italic text-paper/70">Direct lines, no middle desk.</em>
            </h3>
            <p className="mt-6 max-w-xl text-paper/65 text-[15px] leading-relaxed">
              For project enquiries, capability statements and technical
              consultation, reach the office on any of the lines below. Please note
              these numbers are not on WhatsApp — call or SMS only.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:self-end">
            <ul className="space-y-4">
              {phones.map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p}`}
                    className="group flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-paper/20 py-2 transition hover:border-paper sm:min-h-0 sm:pb-3 sm:py-0"
                  >
                    <span className="inline-flex min-w-0 items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-paper/60" />
                      <span className="font-mono text-base tracking-wider sm:text-lg lg:text-xl">{p}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] font-mono uppercase tracking-widest text-paper/45">
              Call or SMS — not available on WhatsApp.
            </p>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          id="contact-form"
          className="scroll-mt-28 border-b border-paper/15 pb-12 pt-2 sm:scroll-mt-32 sm:pb-16 lg:scroll-mt-36"
        >
          <p className="max-w-xl text-[15px] leading-relaxed text-paper/65">
            You can also send a written enquiry, we typically respond within one business day.
          </p>
          <div className="mt-6 max-w-2xl rounded-lg border border-paper/15 bg-paper p-6 text-ink shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </motion.div>

        {/* Big wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="mt-12 sm:my-16 lg:my-20 xl:my-28"
        >
          <div className="font-display font-light leading-[1.05] text-paper select-none">
            <div className="text-[clamp(1.75rem,7.2vw,4.5rem)] text-balance wrap-break-word">
              Lynek International Limited
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 border-t border-paper/15 pt-10 sm:gap-12 sm:pt-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Lynek International" className="h-10 w-10 object-contain" />
              <div className="overline text-paper/55">Lynek International</div>
            </div>
            <p className="mt-5 text-sm text-paper/60 leading-relaxed max-w-xs">
              A legacy-driven engineering institution serving Nigeria's oil, gas
              and industrial sectors with precision, integrity and discipline.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Mail, MapPin].map((Icon, i) => (
                <a
                  key={i}
                  href="/#contact"
                  aria-label="Contact"
                  className="grid h-11 w-11 place-items-center border border-paper/20 transition hover:bg-paper hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="overline text-paper/55">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center text-sm text-paper/80 transition hover:text-paper"
                    >
                      {l.label}
                      <span className="ml-1 inline-block opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="overline text-paper/55">Direct lines</div>
            <ul className="mt-5 space-y-3 font-mono text-sm">
              {phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p}`} className="text-paper/80 hover:text-paper transition">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container-x flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-6 font-mono text-[11px] uppercase tracking-widest text-paper/45">
          <div>© {new Date().getFullYear()} Lynek International — Nigeria</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-paper">Privacy</a>
            <a href="#" className="hover:text-paper">Terms</a>
            <a href="/#contact" className="hover:text-paper">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
