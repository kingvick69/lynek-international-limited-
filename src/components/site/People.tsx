import { motion } from "motion/react";
import founderImg from "@/assets/employee-1.jpg";
import { ArrowUpRight } from "lucide-react";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function People() {
  return (
    <section id="founder" className="bg-paper py-20 sm:py-28 lg:py-32 xl:py-40">
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
            <figcaption className="mt-5 border-t border-rule pt-4 sm:mt-6 sm:pt-5">
              <div className="font-display text-lg text-ink sm:text-xl">Dr. Engr. Irivike Lucky Ewhuba</div>
              <div className="overline text-ink-3 mt-2 text-[10px] leading-relaxed sm:text-[11px]">
                Founder · MD/CEO
              </div>
            </figcaption>
          </div>

          <div className="col-span-12 lg:col-span-7" id="about">
            <div className="overline text-ink-3">About the founder</div>
            <blockquote className="mt-6 font-display font-light text-pretty text-[clamp(1.25rem,5.5vw,2.4rem)] leading-[1.25] text-ink sm:leading-[1.2]">
              <span className="text-ink-3 mr-1">&ldquo;</span>
              Greatness is achieved not by comfort, but through years of discipline,
              sacrifice, courage, and the willingness to rise above limitations.
              <span className="text-ink-3 ml-1">&rdquo;</span>
            </blockquote>

            <div className="mt-10 space-y-5 text-ink-2 text-[15px] leading-relaxed">
              <p>
                The vision behind Lynek International was shaped through years of discipline, sacrifice, and deep
                professional experience within the oil, gas, engineering, and industrial sectors. After decades of
                working in demanding operational environments, leading complex well intervention projects, and
                contributing to the growth and stability of major energy organizations, Dr. Engr. Irivike Lucky
                Ewhuba developed a vision that extended beyond personal success. He began to see the need for a
                platform that would not only deliver technical solutions but also redefine how excellence,
                integrity, and innovation are practiced within the industry. From this conviction, Lynek
                International was conceived not merely as a business entity, but as a legacy-driven institution
                built to solve real-world industrial challenges, create sustainable value, and raise the standard
                of professional service delivery.
              </p>
              <p>
                His hope for Lynek International is to establish a globally competitive organization that reflects
                precision, reliability, and excellence in every aspect of its operations. He envisions a company
                where engineering expertise is combined with strong ethical values, where every project is
                executed with discipline, safety consciousness, and unwavering commitment to quality. For him,
                Lynek International represents more than corporate success; it is a platform designed to promote
                innovation, encourage problem-solving, and introduce smarter, more efficient approaches to
                industrial operations. He believes that when technical knowledge is guided by purpose and
                integrity, it has the power to transform industries and communities alike.
              </p>
              <p>
                Beyond service delivery, Dr. Engr. Irivike Lucky Ewhuba carries a strong passion for human
                development. One of his core aspirations for Lynek International is to create opportunities for
                young professionals, engineers, and technicians who are eager to grow but lack access to
                mentorship and exposure. He envisions the company as a training ground where knowledge is
                transferred, skills are sharpened, and future industry leaders are developed. Through structured
                guidance, real-world experience, and exposure to high-level projects, he hopes Lynek International
                will serve as a bridge between potential and achievement, empowering individuals to build
                meaningful and impactful careers.
              </p>
              <p>
                His vision also extends to national and economic development. He believes that industries thrive
                when built on competence, accountability, and innovation. Therefore, he hopes Lynek International
                will contribute meaningfully to local content development, job creation, and the strengthening of
                technical capacity within the energy and engineering sectors. By upholding international best
                practices while maintaining strong local relevance, he aims to position the company as a trusted
                partner in both public and private sector projects.
              </p>
              <p>
                At the heart of this vision is a deeply rooted belief that true greatness is not measured by
                wealth or recognition alone, but by impact, legacy, and the ability to influence positive change.
                Dr. Engr. Irivike Lucky Ewhuba sees Lynek International as a lifelong mission a structure that will
                outlive individual effort and continue to inspire excellence for generations. He hopes it will
                stand as a symbol of what is possible when experience, vision, and purpose come together: a
                company built not just to operate, but to lead, transform, and endure.
              </p>
            </div>

          </div>
        </motion.figure>
      </div>
    </section>
  );
}
