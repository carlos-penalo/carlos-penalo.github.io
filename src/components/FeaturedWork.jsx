import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";
import { getFeaturedProjectsSorted } from "@/data/videoProjects.js";
import { FeaturedVideoCard } from "./FeaturedVideoCard.jsx";

export function FeaturedWork({ projects, onOpenProject }) {
  const reduce = useReducedMotion();
  const featured = getFeaturedProjectsSorted(projects);
  const ws = siteConfig.workStrip;

  return (
    <section id="work" className="scroll-mt-28 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{ws.eyebrow}</p>
        <h2 className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3rem)] leading-tight">{ws.title}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{ws.lead}</p>

        {featured.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-card/80 p-8 backdrop-blur-md">
            <p className="m-0 text-muted leading-relaxed">
              No featured videos yet. In <code className="text-sm text-fg">src/data/manualVideos.js</code>, set{" "}
              <code className="text-sm text-fg">featured: true</code> (and optional{" "}
              <code className="text-sm text-fg">featuredOrder</code>) on the clips you want here.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                layout={false}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.05 }}
                className={`min-w-0 ${i === 0 ? "lg:col-span-2" : ""}`}
              >
                <FeaturedVideoCard project={p} onOpen={() => onOpenProject(p, featured)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
