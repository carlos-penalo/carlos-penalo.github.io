import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function Process() {
  const reduce = useReducedMotion();
  const { process, processSection } = siteConfig;

  return (
    <section id="process" className="section process">
      <div className="container">
        <p className="eyebrow">{processSection.eyebrow}</p>
        <h2 className="section-title">{processSection.title}</h2>
        <p className="section-lead process-lead">{processSection.lead}</p>

        <ol className="process-track">
          {process.map((s, i) => (
            <motion.li
              key={s.title}
              className="process-step glass"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.07 }}
            >
              <span className="process-step__num" aria-hidden>
                {s.step}
              </span>
              <div className="process-step__copy">
                <h3 className="process-step__title">{s.title}</h3>
                <p className="process-step__desc">{s.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
      <style>{`
        .process-lead {
          margin-bottom: var(--space-10);
        }
        .process-track {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .process-track {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: var(--space-3);
            align-items: stretch;
          }
        }
        .process-step {
          position: relative;
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          border: 1px solid var(--border);
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }
        @media (min-width: 900px) {
          .process-step {
            flex-direction: column;
            min-height: 100%;
          }
        }
        .process-step__num {
          flex-shrink: 0;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--accent);
          width: 2.5rem;
          height: 2.5rem;
          display: grid;
          place-items: center;
          border-radius: 12px;
          border: 1px solid rgba(124, 156, 255, 0.35);
          background: rgba(124, 156, 255, 0.08);
        }
        .process-step__copy {
          min-width: 0;
        }
        .process-step__title {
          margin: 0 0 var(--space-2);
          font-size: var(--text-base);
          font-weight: 650;
        }
        .process-step__desc {
          margin: 0;
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
}
