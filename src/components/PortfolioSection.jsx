import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";
import { CategoryFilters } from "./CategoryFilters.jsx";
import { PortfolioGrid } from "./PortfolioGrid.jsx";

export function PortfolioSection({ projects, activeFilter, onFilterChange, onOpenProject }) {
  const reduce = useReducedMotion();
  const fw = siteConfig.featuredWork;

  return (
    <section id="portfolio" className="scroll-mt-28 px-4 pb-8 pt-4 md:px-6 md:pb-12 md:pt-8">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          className="text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{fw.eyebrow}</p>
          <h2 className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3.25rem)] leading-tight">{fw.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{fw.lead}</p>
        </motion.div>

        <CategoryFilters activeFilter={activeFilter} onChange={onFilterChange} projectCount={projects.length} />

        {projects.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-card/80 p-8 text-center text-muted backdrop-blur-md">
            <p>
              No projects match this filter yet. Add videos under <code className="text-fg">src/assets/videos/</code>{" "}
              (see README), then refresh the build.
            </p>
          </div>
        ) : (
          <PortfolioGrid projects={projects} onOpenProject={onOpenProject} />
        )}
      </div>
    </section>
  );
}
