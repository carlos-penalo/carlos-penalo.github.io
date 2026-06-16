import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";
import { getFeaturedProjectsSorted } from "@/data/videoProjects.js";
import { FeaturedVideoCard } from "./FeaturedVideoCard.jsx";

export function FeaturedWork({ projects, onOpenProject }) {
  const reduce = useReducedMotion();
  const featured = getFeaturedProjectsSorted(projects);

  return (
    <section id="work" className="section featured section--featured-mobile">
      <div className="container">
        <p className="eyebrow">{siteConfig.featuredWork.eyebrow}</p>
        <h2 className="section-title">{siteConfig.featuredWork.title}</h2>
        <p className="section-lead featured-lead">{siteConfig.featuredWork.lead}</p>

        {featured.length === 0 ? (
          <div className="featured-empty glass">
            <p className="muted">
              No featured videos yet. In <code>src/data/manualVideos.js</code>, set{" "}
              <code>featured: true</code> (and optional <code>featuredOrder</code>) on the clips you want here.
            </p>
          </div>
        ) : (
          <div className="featured-grid">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                layout={false}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.05 }}
                className="featured-grid__cell"
              >
                <FeaturedVideoCard project={p} onOpen={() => onOpenProject(p, featured)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .section--featured-mobile {
          padding-block: clamp(2.5rem, 8vw, var(--space-20));
        }
        .featured .section-lead {
          max-width: 100%;
          margin: 0 0 var(--space-8);
          font-size: clamp(0.875rem, 3.5vw, var(--text-base));
          line-height: 1.55;
        }
        @media (min-width: 640px) {
          .featured .section-lead {
            margin: 0 0 var(--space-10);
            font-size: var(--text-base);
            max-width: 62ch;
          }
        }
        .featured .section-lead.featured-lead {
          margin-bottom: var(--space-8);
        }
        @media (min-width: 640px) {
          .featured .section-lead.featured-lead {
            margin-bottom: var(--space-10);
          }
        }
        .featured-grid {
          display: grid;
          gap: var(--space-5);
          grid-template-columns: minmax(0, 1fr);
        }
        .featured-grid__cell {
          min-width: 0;
        }
        @media (min-width: 960px) {
          .featured-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--space-6);
          }
          .featured-grid > .featured-grid__cell:first-child {
            grid-column: span 2;
          }
        }
        @media (min-width: 1200px) {
          .featured-grid {
            gap: var(--space-8);
          }
        }
        .featured-empty {
          padding: var(--space-8);
          border-radius: var(--radius-lg);
        }
        .featured-empty code {
          font-size: 0.9em;
          color: var(--text);
        }
        .muted {
          margin: 0;
          color: var(--text-muted);
          line-height: 1.7;
        }
      `}</style>
    </section>
  );
}
