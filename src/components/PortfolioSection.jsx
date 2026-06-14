import { CategoryFilters } from "./CategoryFilters.jsx";
import { PortfolioGrid } from "./PortfolioGrid.jsx";

export function PortfolioSection({ projects, activeFilter, onFilterChange, onOpenProject }) {
  return (
    <section className="section portfolio-section">
      <div className="container">
        <CategoryFilters activeFilter={activeFilter} onChange={onFilterChange} projectCount={projects.length} />
        {projects.length === 0 ? (
          <div className="portfolio-empty glass">
            <p>
              No projects match this filter yet. Add videos under{" "}
              <code>src/assets/videos/</code> (see README), then refresh the build.
            </p>
          </div>
        ) : (
          <PortfolioGrid projects={projects} onOpenProject={onOpenProject} />
        )}
      </div>
      <style>{`
        .portfolio-section {
          padding-top: 0;
        }
        .portfolio-empty {
          margin-top: var(--space-8);
          padding: var(--space-8);
          border-radius: var(--radius-lg);
          color: var(--text-muted);
        }
        .portfolio-empty code {
          color: var(--text);
          font-size: 0.9em;
        }
      `}</style>
    </section>
  );
}
