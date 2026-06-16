import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function WhyMe() {
  const reduce = useReducedMotion();
  const { whyMe } = siteConfig;

  return (
    <section id="why" className="section why-me">
      <div className="container">
        <p className="eyebrow">{whyMe.eyebrow}</p>
        <h2 className="section-title">{whyMe.title}</h2>
        <p className="section-lead why-me-lead">{whyMe.lead}</p>
        <div className="why-grid">
          {whyMe.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="why-card glass"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.42, delay: reduce ? 0 : i * 0.06 }}
            >
              <h3 className="why-card__title">{p.title}</h3>
              <p className="why-card__body">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .why-me-lead {
          margin-bottom: var(--space-10);
        }
        .why-grid {
          display: grid;
          gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 720px) {
          .why-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .why-card {
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          border: 1px solid var(--border);
        }
        .why-card__title {
          margin: 0 0 var(--space-3);
          font-size: var(--text-base);
          font-weight: 650;
        }
        .why-card__body {
          margin: 0;
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
