import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";
import { MagneticButton } from "@/components/MagneticButton.jsx";

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function FinalCta() {
  const reduce = useReducedMotion();
  const { finalCta } = siteConfig;

  return (
    <section className="px-4 pb-24 pt-8 md:px-6" aria-labelledby="final-cta-title">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? false : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-card via-canvas to-[#1a0505] px-8 py-14 text-center shadow-[0_0_80px_rgba(255,23,23,0.12)] md:px-16 md:py-16"
        >
          <div
            className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent-dark/60 blur-3xl"
            aria-hidden
          />

          <p id="final-cta-title" className="relative z-[1] mx-auto max-w-2xl font-medium tracking-tight text-fg text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]">
            {finalCta.title}
          </p>
          <p className="relative z-[1] mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {finalCta.lead}
          </p>

          <div className="relative z-[1] mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <MagneticButton
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_48px_rgba(255,23,23,0.25)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,23,23,0.4)] sm:w-auto"
              onClick={() => scrollToId("contact")}
            >
              {finalCta.primary}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </MagneticButton>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-fg transition duration-300 hover:border-accent/40 hover:bg-white/[0.07] sm:w-auto"
              onClick={() => scrollToId("portfolio")}
            >
              {finalCta.secondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
