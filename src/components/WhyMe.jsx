import { motion, useReducedMotion } from "framer-motion";
import { Clock, Layers, TrendingUp } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

const icons = [TrendingUp, Layers, Clock];

export function WhyMe() {
  const reduce = useReducedMotion();
  const { whyMe } = siteConfig;

  return (
    <section id="why" className="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{whyMe.eyebrow}</p>
        <h2 className="max-w-3xl font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3.25rem)] leading-tight">
          {whyMe.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{whyMe.lead}</p>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: reduce ? 0 : 0.5 }}
            className="relative min-h-[280px] overflow-hidden rounded-[26px] border border-white/10 bg-card shadow-card lg:min-h-[420px]"
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse 90% 80% at 40% 20%, rgba(255,23,23,0.18), transparent 55%), linear-gradient(165deg, #0a0a0a, #050505)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-14deg, transparent, transparent 18px, rgba(255,255,255,0.03) 18px, rgba(255,255,255,0.03) 19px)",
              }}
              aria-hidden
            />
            <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
            <p className="absolute left-8 top-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Edit suite</p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {whyMe.pillars.map((p, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={p.title}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={reduce ? false : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: reduce ? 0 : 0.42, delay: reduce ? 0 : i * 0.07 }}
                  className="rounded-3xl border border-white/10 bg-card/90 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-7"
                >
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_0_28px_rgba(255,23,23,0.35)]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="m-0 text-lg font-medium tracking-tight text-fg">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{p.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
