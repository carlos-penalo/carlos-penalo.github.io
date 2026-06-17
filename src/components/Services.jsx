import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";
import { BeforeAfter } from "@/components/BeforeAfter.jsx";
import { LoopPreviewVideo } from "@/components/LoopPreviewVideo.jsx";

function scrollToHash(hash) {
  const id = hash.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const SERVICE_VIDEOS = {
  motion: "/previews/motion-social-ads.mp4",
  saas: "/previews/saas-explainer.mp4",
  talk: "/previews/talking-head.mp4",
};

function LoopVideo({ src, label }) {
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-black md:min-h-[280px]">
      {/* Blurred fill behind keeps the box full while the real frame shows uncropped on top. */}
      <LoopPreviewVideo
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        src={src}
        aria-hidden
      />
      <LoopPreviewVideo className="absolute inset-0 h-full w-full object-contain" src={src} />
      {label ? (
        <p className="absolute left-6 top-6 z-[1] text-xs font-semibold uppercase tracking-[0.2em] text-white/80 drop-shadow">
          {label}
        </p>
      ) : null}
    </div>
  );
}

function ServiceVisual({ kind }) {
  if (kind === "compare") {
    return (
      <BeforeAfter
        className="h-full min-h-[220px] md:min-h-[280px]"
        beforeSrc="/services/grade-before-real.png"
        afterSrc="/services/grade-after.jpeg"
      />
    );
  }
  if (SERVICE_VIDEOS[kind]) {
    const labels = { motion: "Paid social", saas: "SaaS explainer", talk: "Talking head" };
    return <LoopVideo src={SERVICE_VIDEOS[kind]} label={labels[kind]} />;
  }
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#140a0a] via-[#0b0b0b] to-black md:min-h-[280px]">
      <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 70% 30%, rgba(255,23,23,0.25), transparent 55%)" }} />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-12deg,transparent,transparent_14px,rgba(255,255,255,0.03)_14px,rgba(255,255,255,0.03)_15px)]" />
    </div>
  );
}

/** Inner card markup — unchanged design/content; rendered inside the sticky wrapper. */
function ServiceCardInner({ item, index, onCta }) {
  return (
    <>
      <div className="pointer-events-none absolute right-8 top-8 h-2 w-2 rounded-full bg-accent/70 blur-[0.5px]" aria-hidden />
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={index % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
          <h3 className="font-medium tracking-tight text-fg text-2xl md:text-3xl">{item.title}</h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{item.body}</p>
          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-fg transition duration-300 hover:border-accent/40 hover:bg-white/[0.07]"
            onClick={onCta}
          >
            {item.cta}
            <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden />
          </button>
        </div>
        <div
          className={`min-h-[220px] transition duration-500 ease-out md:min-h-[280px] ${
            index % 2 === 1 ? "lg:order-1" : "lg:order-2"
          } group-hover:[&_.svc-media]:scale-[1.02]`}
        >
          <div className="svc-media h-full transition duration-500 ease-out">
            <ServiceVisual kind={item.visual} />
          </div>
        </div>
      </div>
    </>
  );
}

const CARD_CLASS =
  "group relative overflow-hidden rounded-[28px] border border-white/10 bg-card p-6 shadow-card md:min-h-[min(100vw,460px)] md:p-10 lg:p-12";

/** Sticky stacked card: scroll-synced scale / opacity / brightness / lift as the next card covers it. */
function ServiceCard({ item, index, total, progress, reduce, onCta }) {
  const start = index / total;
  const isLast = index === total - 1;
  const targetScale = isLast ? 1 : 1 - (total - 1 - index) * 0.04;

  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, 1], [0, isLast ? 0 : 0.18]);
  const brightness = useTransform(progress, [start, 1], [1, isLast ? 1 : 0.78]);
  const y = useTransform(progress, [start, 1], [0, isLast ? 0 : -8]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  if (reduce) {
    return (
      <div className="mb-8 last:mb-0">
        <article className={CARD_CLASS}>
          <ServiceCardInner item={item} index={index} onCta={onCta} />
        </article>
      </div>
    );
  }

  return (
    <div
      className="sticky mb-8 last:mb-0"
      style={{ top: `calc(var(--stack-top) + ${index} * var(--stack-peek))`, zIndex: index }}
    >
      <motion.article
        className={CARD_CLASS}
        style={{ scale, filter, y, transformOrigin: "center top", willChange: "transform" }}
      >
        <ServiceCardInner item={item} index={index} onCta={onCta} />
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-black"
          style={{ opacity: dim }}
          aria-hidden
        />
      </motion.article>
    </div>
  );
}

export function Services({ onPortfolioFilter }) {
  const reduce = useReducedMotion();
  const { services } = siteConfig;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

      <div
        ref={containerRef}
        className="svc-stack mx-auto mt-14 max-w-[1200px] px-4 md:mt-20 md:px-6 [--stack-peek:12px] [--stack-top:88px] md:[--stack-peek:16px] md:[--stack-top:110px]"
      >
        {services.items.map((item, i) => (
          <ServiceCard
            key={item.title}
            item={item}
            index={i}
            total={services.items.length}
            progress={scrollYProgress}
            reduce={reduce}
            onCta={() => handleCta(item)}
          />
        ))}
      </div>
    </section>
  );
}
