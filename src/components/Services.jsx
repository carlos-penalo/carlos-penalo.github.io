import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";
import { BeforeAfter } from "@/components/BeforeAfter.jsx";

function scrollToHash(hash) {
  const id = hash.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ServiceVisual({ kind }) {
  if (kind === "compare") {
    return (
      <BeforeAfter
        className="h-full min-h-[220px] md:min-h-[280px]"
        beforeSrc="/services/grade-before.png"
        afterSrc="/services/grade-after.png"
      />
    );
  }
  if (kind === "saas") {
    return (
      <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-card md:min-h-[280px]">
        <img
          src="/services/saas-ui.png"
          alt="SaaS analytics dashboard UI"
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />
      </div>
    );
  }
  if (kind === "talk") {
    return (
      <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#120808] via-card to-canvas md:min-h-[280px]">
        <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,23,23,0.2), transparent 50%)" }} />
        <div className="absolute bottom-0 left-1/2 h-[78%] w-[55%] -translate-x-1/2 rounded-t-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02]" />
        <p className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Talking head</p>
      </div>
    );
  }
  if (kind === "wave") {
    return (
      <div className="relative flex h-full min-h-[220px] items-end overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-card to-black md:min-h-[280px]">
        <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-around gap-1 px-6 pb-8 opacity-80">
          {Array.from({ length: 32 }).map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-accent/20 to-accent/80"
              style={{ height: `${18 + ((i * 13) % 55)}%` }}
            />
          ))}
        </div>
        <p className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Mix & delivery</p>
      </div>
    );
  }
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#140a0a] via-[#0b0b0b] to-black md:min-h-[280px]">
      <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 70% 30%, rgba(255,23,23,0.25), transparent 55%)" }} />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-12deg,transparent,transparent_14px,rgba(255,255,255,0.03)_14px,rgba(255,255,255,0.03)_15px)]" />
      <p className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Paid social</p>
    </div>
  );
}

export function Services({ onPortfolioFilter }) {
  const reduce = useReducedMotion();
  const { services } = siteConfig;

  const handleCta = (item) => {
    if (item.portfolioFilter && typeof onPortfolioFilter === "function") {
      onPortfolioFilter(item.portfolioFilter);
      return;
    }
    scrollToHash(item.href || "#portfolio");
  };

  return (
    <section id="services" className="scroll-mt-28 px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{services.eyebrow}</p>
        <h2 className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3.25rem)] leading-tight">{services.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{services.lead}</p>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1200px] flex-col gap-8 px-4 md:mt-20 md:px-6">
        {services.items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={reduce ? false : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-card p-6 shadow-card md:min-h-[min(100vw,460px)] md:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute right-8 top-8 h-2 w-2 rounded-full bg-accent/70 blur-[0.5px]" aria-hidden />
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className={i % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                <h3 className="font-medium tracking-tight text-fg text-2xl md:text-3xl">{item.title}</h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{item.body}</p>
                <button
                  type="button"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-fg transition duration-300 hover:border-accent/40 hover:bg-white/[0.07]"
                  onClick={() => handleCta(item)}
                >
                  {item.cta}
                  <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden />
                </button>
              </div>
              <div
                className={`min-h-[220px] transition duration-500 ease-out md:min-h-[280px] ${
                  i % 2 === 1 ? "lg:order-1" : "lg:order-2"
                } group-hover:[&_.svc-media]:scale-[1.02]`}
              >
                <div className="svc-media h-full transition duration-500 ease-out">
                  <ServiceVisual kind={item.visual} />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
