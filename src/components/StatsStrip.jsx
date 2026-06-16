import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function StatsStrip() {
  const reduce = useReducedMotion();
  const { stats } = siteConfig;

  return (
    <section className="px-4 py-16 md:px-6 md:py-20" aria-labelledby="stats-title">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{stats.eyebrow}</p>
        <h2 id="stats-title" className="font-medium tracking-tight text-fg text-[clamp(1.75rem,3vw,2.5rem)]">
          {stats.title}
        </h2>
        <ul className="mt-10 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-4 md:gap-5">
          {stats.items.map((item, i) => (
            <motion.li
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : i * 0.05 }}
              className="rounded-3xl border border-white/10 bg-card/90 p-6 shadow-card backdrop-blur-sm"
            >
              <span className="block font-medium tracking-tight text-fg text-[clamp(1.75rem,4vw,2.35rem)] leading-none">
                {item.value}
              </span>
              <span className="mt-2 block text-sm text-muted">{item.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
