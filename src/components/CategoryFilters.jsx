import { motion, useReducedMotion } from "framer-motion";

const ALL = "all";

export function CategoryFilters({ activeFilter, onChange, projectCount }) {
  const reduce = useReducedMotion();
  const filters = [
    { id: ALL, label: "All" },
    { id: "Talking Head Motion Graphics", label: "Talking Head" },
    { id: "Simple Style", label: "Simple Style" },
    { id: "SaaS ADS", label: "SaaS Ads" },
    { id: "Facebook Ads", label: "Facebook Ads" },
  ];

  return (
    <div className="mt-6">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {filters.map((f) => {
          const active = activeFilter === f.id;
          return (
            <motion.button
              key={f.id}
              type="button"
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 ${
                active
                  ? "border-accent bg-transparent text-fg shadow-[0_0_24px_rgba(255,23,23,0.18)]"
                  : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-fg"
              }`}
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
      <p className="mt-4 text-center text-sm text-muted" aria-live="polite">
        Showing <span className="font-semibold text-fg">{projectCount}</span>{" "}
        {projectCount === 1 ? "project" : "projects"}
      </p>
    </div>
  );
}
