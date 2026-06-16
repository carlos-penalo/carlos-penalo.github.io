import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { VideoCard } from "./VideoCard.jsx";

export function PortfolioGrid({ projects, onOpenProject }) {
  const reduce = useReducedMotion();

  return (
    <LayoutGroup id="portfolio-grid">
      <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={reduce ? false : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : Math.min(i, 10) * 0.02 }}
              className="flex min-h-0 flex-col"
            >
              <VideoCard project={p} onOpen={() => onOpenProject(p, projects)} variant="grid" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
