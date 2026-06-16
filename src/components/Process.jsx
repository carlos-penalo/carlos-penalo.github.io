import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function Process() {
  const reduce = useReducedMotion();
  const { process, processSection } = siteConfig;

  return (
    <section id="process" className="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{processSection.eyebrow}</p>
        <h2 className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3rem)] leading-tight">{processSection.title}</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{processSection.lead}</p>

        <ol className="mt-14 grid list-none gap-4 p-0 md:grid-cols-4 md:gap-3">
          {process.map((s, i) => (
            <motion.li
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.07 }}
              className="relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-card/90 p-6 shadow-card md:min-h-[220px]"
            >
              {i < process.length - 1 ? (
                <span
                  className="pointer-events-none absolute -right-2 top-1/2 z-[1] hidden h-px w-4 bg-gradient-to-r from-white/25 to-transparent md:block"
                  aria-hidden
                />
              ) : null}
              <span className="text-xs font-bold tracking-[0.18em] text-accent" aria-hidden>
                {s.step}
              </span>
              <div>
                <h3 className="m-0 text-base font-medium tracking-tight text-fg md:text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
