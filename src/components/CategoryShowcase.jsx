import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

export function CategoryShowcase({ counts, activeFilter, onSelectCategory }) {
  const reduce = useReducedMotion();

  return (
    <section id="categories" className="section categories">
      <div className="container">
        <p className="eyebrow">Browse</p>
        <h2 className="section-title">Categories</h2>
        <p className="section-lead">
          Pick a lane to filter the portfolio. Everything updates in place — no page reloads.
        </p>

        <div className="cat-grid">
          {siteConfig.categories.map((cat, i) => {
            const count = counts[cat.id] ?? 0;
            const active = activeFilter === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                className={`cat-card glass ${active ? "cat-card--active" : ""}`}
                onClick={() => onSelectCategory(cat.id)}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.06 }}
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                aria-pressed={active}
              >
                <div className="cat-card__top">
                  <div>
                    <h3 className="cat-card__title">{cat.id}</h3>
                    <p className="cat-card__desc">{cat.description}</p>
                  </div>
                  <motion.span
                    className="cat-card__arrow"
                    aria-hidden
                    animate={reduce ? undefined : { x: active ? 3 : 0, y: active ? -3 : 0 }}
                  >
                    <ArrowUpRight size={22} />
                  </motion.span>
                </div>
                <div className="cat-card__meta">
                  <span className="pill">{count} projects</span>
                  {active && <span className="pill pill--accent">Filtering</span>}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      <style>{`
        .cat-grid {
          display: grid;
          gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 720px) {
          .cat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1080px) {
          .cat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .cat-card {
          text-align: left;
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          cursor: pointer;
          border: 1px solid var(--border);
          color: inherit;
          font: inherit;
          box-shadow: var(--shadow-card);
          transition: border-color var(--transition-med), box-shadow var(--transition-med);
        }
        .cat-card:hover {
          border-color: rgba(255, 255, 255, 0.22);
        }
        .cat-card--active {
          border-color: rgba(124, 156, 255, 0.45);
          box-shadow: 0 16px 50px rgba(124, 156, 255, 0.12);
        }
        .cat-card__top {
          display: flex;
          justify-content: space-between;
          gap: var(--space-4);
          align-items: flex-start;
        }
        .cat-card__title {
          margin: 0 0 var(--space-2);
          font-size: var(--text-lg);
          letter-spacing: -0.02em;
        }
        .cat-card__desc {
          margin: 0;
          color: var(--text-muted);
          font-size: var(--text-sm);
          max-width: 42ch;
        }
        .cat-card__arrow {
          display: inline-flex;
          color: var(--text-muted);
        }
        .cat-card--active .cat-card__arrow {
          color: var(--accent);
        }
        .cat-card__meta {
          margin-top: var(--space-6);
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .pill {
          font-size: var(--text-xs);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .pill--accent {
          border-color: rgba(124, 156, 255, 0.35);
          color: var(--text);
          background: var(--accent-soft);
        }
      `}</style>
    </section>
  );
}
