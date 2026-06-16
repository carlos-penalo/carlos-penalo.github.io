import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[1.35fr_0.75fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{siteConfig.about.eyebrow}</p>
          <h2 className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3rem)] leading-tight">{siteConfig.about.title}</h2>
          <p className="mt-6 max-w-[65ch] text-xl leading-relaxed text-muted">{siteConfig.about.intro}</p>
          {siteConfig.about.body.map((para, idx) => (
            <p key={idx} className="mt-4 max-w-[70ch] leading-relaxed text-muted">
              {para}
            </p>
          ))}
        </motion.div>

        <motion.aside
          className="rounded-3xl border border-white/10 bg-card/90 p-6 shadow-card backdrop-blur-md"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.06 }}
          aria-label="Focus areas"
        >
          <h3 className="m-0 text-base font-medium text-fg">Where I lean in</h3>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0">
            {siteConfig.about.skills.map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
