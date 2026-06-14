import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { VideoCard } from "./VideoCard.jsx";

export function PortfolioGrid({ projects, onOpenProject }) {
  const reduce = useReducedMotion();

  return (
    <LayoutGroup id="portfolio-grid">
      <motion.div layout className="portfolio-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={reduce ? false : { opacity: 1, scale: 1 }}
              exit={reduce ? false : { opacity: 0, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="portfolio-grid__cell"
              style={{ transitionDelay: reduce ? "0ms" : `${Math.min(i, 8) * 18}ms` }}
            >
              <VideoCard project={p} onOpen={() => onOpenProject(p, projects)} variant="grid" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
          margin-top: var(--space-8);
        }
        @media (min-width: 720px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1080px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .portfolio-grid__cell:nth-child(6n + 1) {
            grid-column: span 2;
          }
          .portfolio-grid__cell:nth-child(6n + 1) .video-card__media {
            aspect-ratio: 16 / 9;
          }
        }
      `}</style>
    </LayoutGroup>
  );
}
