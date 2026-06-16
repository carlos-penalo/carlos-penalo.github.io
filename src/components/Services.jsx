import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

function scrollToHash(hash) {
  const id = hash.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Services() {
  const reduce = useReducedMotion();
  const { services } = siteConfig;

  return (
    <section id="services" className="section services">
      <div className="container">
        <p className="eyebrow">{services.eyebrow}</p>
        <h2 className="section-title">{services.title}</h2>
        <p className="section-lead services-lead">{services.lead}</p>
        <div className="services-grid">
          {services.items.map((item, i) => (
            <motion.article
              key={item.title}
              className="service-card glass"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.05 }}
            >
              <h3 className="service-card__title">{item.title}</h3>
              <p className="service-card__body">{item.body}</p>
              <button type="button" className="service-card__cta" onClick={() => scrollToHash(item.href)}>
                {item.cta}
                <ArrowUpRight size={16} aria-hidden />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
      <style>{`
        .services-lead {
          margin-bottom: var(--space-10);
        }
        .services-grid {
          display: grid;
          gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1080px) {
          .services-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .service-card {
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          min-height: 200px;
        }
        .service-card__title {
          margin: 0;
          font-size: var(--text-lg);
          letter-spacing: -0.02em;
          font-weight: 650;
        }
        .service-card__body {
          margin: 0;
          flex: 1;
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: 1.55;
        }
        .service-card__cta {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: none;
          background: transparent;
          color: var(--accent);
          font: inherit;
          font-weight: 600;
          font-size: var(--text-sm);
          cursor: pointer;
          padding: 0;
        }
        .service-card__cta:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
