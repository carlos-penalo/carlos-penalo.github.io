import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig.js";

export function Testimonials() {
  const reduce = useReducedMotion();
  const { testimonials } = siteConfig;

  return (
    <section className="px-4 py-16 md:px-6 md:py-24" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{testimonials.eyebrow}</p>
        <h2 id="testimonials-title" className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3rem)]">
          {testimonials.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{testimonials.lead}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.items.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? false : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.06 }}
              className="m-0 rounded-3xl border border-white/10 bg-card/90 p-6 shadow-card md:p-7"
            >
              <p className="m-0 text-sm leading-relaxed text-muted md:text-base">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
