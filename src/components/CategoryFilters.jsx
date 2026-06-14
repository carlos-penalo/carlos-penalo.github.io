import { motion, useReducedMotion } from "framer-motion";

const ALL = "all";

export function CategoryFilters({ activeFilter, onChange, projectCount }) {
  const reduce = useReducedMotion();
  const filters = [
    { id: ALL, label: "All work" },
    { id: "Talking Head Motion Graphics", label: "Talking head" },
    { id: "Simple Style", label: "Simple style" },
    { id: "SaaS ADS", label: "SaaS ads" },
    { id: "Facebook Ads", label: "Facebook ads" },
  ];

  return (
    <div className="filters" id="portfolio">
      <div className="filters__row">
        {filters.map((f) => {
          const active = activeFilter === f.id;
          return (
            <motion.button
              key={f.id}
              type="button"
              className={`filter-pill ${active ? "filter-pill--active" : ""}`}
              onClick={() => onChange(f.id)}
              aria-pressed={active}
              layout
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              whileHover={reduce ? undefined : { y: -1 }}
            >
              {f.label}
            </motion.button>
          );
        })}
      </div>
      <p className="filters__meta" aria-live="polite">
        Showing <strong>{projectCount}</strong> {projectCount === 1 ? "project" : "projects"}
      </p>
      <style>{`
        .filters {
          margin-top: var(--space-10);
        }
        .filters__row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .filter-pill {
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-muted);
          font: inherit;
          font-size: var(--text-sm);
          padding: 10px 16px;
          cursor: pointer;
          transition: color var(--transition-fast), border-color var(--transition-fast),
            background var(--transition-fast);
        }
        .filter-pill:hover {
          color: var(--text);
          border-color: var(--border-strong);
          background: rgba(255, 255, 255, 0.06);
        }
        .filter-pill--active {
          color: #0a0a0c;
          background: linear-gradient(135deg, #dfe4ff, var(--accent));
          border-color: transparent;
        }
        .filters__meta {
          margin: var(--space-4) 0 0;
          color: var(--text-subtle);
          font-size: var(--text-sm);
        }
        .filters__meta strong {
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
