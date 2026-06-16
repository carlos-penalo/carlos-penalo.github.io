import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function Testimonials() {
  const reduce = useReducedMotion();
  const { testimonials } = siteConfig;

  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <p className="eyebrow">{testimonials.eyebrow}</p>
        <h2 id="testimonials-title" className="section-title">
          {testimonials.title}
        </h2>
        <p className="section-lead testimonials-lead">{testimonials.lead}</p>
        <div className="testimonial-grid">
          {testimonials.items.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className="testimonial-card glass"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.06 }}
            >
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testimonial-card__name">{t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
      <style>{`
        .testimonials-lead {
          margin-bottom: var(--space-10);
        }
        .testimonial-grid {
          display: grid;
          gap: var(--space-4);
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .testimonial-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .testimonial-card {
          margin: 0;
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          border: 1px solid var(--border);
        }
        .testimonial-card__quote {
          margin: 0 0 var(--space-4);
          color: var(--text-muted);
          font-size: var(--text-sm);
          line-height: 1.65;
        }
        .testimonial-card__name {
          font-size: var(--text-xs);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-subtle);
        }
      `}</style>
    </section>
  );
}
