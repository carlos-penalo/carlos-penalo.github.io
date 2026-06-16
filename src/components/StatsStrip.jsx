import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function StatsStrip() {
  const reduce = useReducedMotion();
  const { stats } = siteConfig;

  return (
    <section className="section stats-strip" aria-labelledby="stats-title">
      <div className="container">
        <p className="eyebrow">{stats.eyebrow}</p>
        <h2 id="stats-title" className="section-title">
          {stats.title}
        </h2>
        <ul className="stats-grid">
          {stats.items.map((item, i) => (
            <motion.li
              key={item.label}
              className="stats-item glass"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : i * 0.05 }}
            >
              <span className="stats-item__value">{item.value}</span>
              <span className="stats-item__label">{item.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <style>{`
        .stats-grid {
          list-style: none;
          margin: var(--space-10) 0 0;
          padding: 0;
          display: grid;
          gap: var(--space-4);
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (min-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .stats-item {
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .stats-item__value {
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--text);
        }
        .stats-item__label {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
