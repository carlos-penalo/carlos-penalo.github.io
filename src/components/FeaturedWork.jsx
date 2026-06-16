import { motion, useReducedMotion } from "framer-motion";
import { getFeaturedProjectsSorted } from "@/data/videoProjects.js";
import { FeaturedVideoCard } from "./FeaturedVideoCard.jsx";

export function FeaturedWork({ projects, onOpenProject }) {
  const reduce = useReducedMotion();
  const featured = getFeaturedProjectsSorted(projects);

  return (
    <section id="work" className="section featured">
      <div className="container">
        <p className="eyebrow">Selected cuts</p>
        <h2 className="section-title">Featured work</h2>
        <p className="section-lead">
          A curated mix across categories — open any piece for full detail and playback.
        </p>

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
                layout
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.05 }}
              >
                <FeaturedVideoCard project={p} onOpen={() => onOpenProject(p, featured)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .featured-grid {
          display: grid;
          gap: var(--space-6);
          grid-template-columns: 1fr;
        }
        @media (min-width: 720px) {
          .featured-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1080px) {
          .featured-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--space-8);
          }
          .featured-grid > *:first-child {
            grid-column: span 2;
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
