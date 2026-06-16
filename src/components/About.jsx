import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <p className="eyebrow">{siteConfig.about.eyebrow}</p>
          <h2 className="section-title">{siteConfig.about.title}</h2>
          <p className="lead">{siteConfig.about.intro}</p>
          {siteConfig.about.body.map((para, idx) => (
            <p key={idx} className="para">
              {para}
            </p>
          ))}
        </motion.div>

        <motion.aside
          className="about-aside glass"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.06 }}
          aria-label="Focus areas"
        >
          <h3 className="aside-title">Where I lean in</h3>
          <ul className="skill-list">
            {siteConfig.about.skills.map((s) => (
              <li key={s} className="skill-pill">
                {s}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
      <style>{`
        .about-grid {
          display: grid;
          gap: var(--space-10);
          align-items: start;
        }
        @media (min-width: 960px) {
          .about-grid {
            grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.75fr);
          }
        }
        .lead {
          font-size: var(--text-lg);
          color: var(--text-muted);
          margin: 0 0 var(--space-4);
          max-width: 65ch;
        }
        .para {
          margin: 0 0 var(--space-4);
          color: var(--text-muted);
          max-width: 70ch;
        }
        .about-aside {
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          border: 1px solid var(--border);
        }
        .aside-title {
          margin: 0 0 var(--space-4);
          font-size: var(--text-base);
        }
        .skill-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .skill-pill {
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-muted);
          font-size: var(--text-sm);
        }
      `}</style>
    </section>
  );
}
