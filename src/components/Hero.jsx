import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";
import { driveFilePreviewUrl } from "@/lib/googleDrive.js";
import { MagneticButton } from "@/components/MagneticButton.jsx";

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero({ heroVideoProject }) {
  const reduce = useReducedMotion();
  const h = siteConfig.hero;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pb-20 pt-4 md:pb-28 md:pt-8">
      {/* Decorative */}
      <div className="pointer-events-none absolute left-[8%] top-32 h-2 w-2 rounded-full bg-accent/80 blur-[1px] md:top-40" aria-hidden />
      <div className="pointer-events-none absolute right-[12%] top-[48%] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_20px_rgba(255,23,23,0.8)]" aria-hidden />

      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ y: bgY }} aria-hidden>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 40%, rgba(77,13,13,0.35) 50%, transparent 60%), repeating-linear-gradient(-22deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 14px)",
          }}
        />
        <div
          className="absolute -left-1/4 top-0 h-[120%] w-[70%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,23,23,0.12), transparent 65%)" }}
        />
        <div
          className="absolute -right-1/4 bottom-[-20%] h-[90%] w-[60%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(77,13,13,0.45), transparent 70%)" }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            {h.urgency ? (
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-card/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(0,201,107,0.7)]" />
                </span>
                {h.urgency}
              </p>
            ) : null}

            <h1 className="relative font-medium tracking-[-0.04em] text-fg text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.02]">
              <span className="relative inline">
                {h.headline}
                <span
                  className="absolute -right-3 top-2 hidden h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(255,23,23,0.9)] md:inline-block"
                  aria-hidden
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-fg via-fg to-accent bg-clip-text text-transparent">{h.headlineAccent}</span>
            </h1>

            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">{h.subhead}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,23,23,0.28)] transition duration-300 hover:scale-[1.03] sm:w-auto"
                onClick={() => scrollToId("work")}
              >
                {h.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </MagneticButton>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-fg transition duration-300 hover:border-white/25 hover:bg-white/[0.06] sm:w-auto"
                onClick={() => scrollToId("contact")}
              >
                {h.secondaryCta}
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <div className="flex -space-x-3" aria-hidden>
                {["A", "B", "C"].map((initial, i) => (
                  <span
                    key={`${initial}-${i}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-card to-canvas text-[11px] font-semibold text-muted ring-2 ring-canvas"
                  >
                    {initial}
                  </span>
                ))}
                <span className="z-[1] flex h-11 min-w-[2.75rem] items-center justify-center rounded-full border border-white/15 bg-fg px-2 text-xs font-bold text-canvas ring-2 ring-canvas">
                  {h.statValue ?? "+95"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                {h.statLabel ? (
                  <p className="max-w-[20rem] text-sm font-medium leading-snug text-fg underline decoration-white/20 underline-offset-4">
                    {h.statLabel}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-fg underline decoration-white/20 underline-offset-4">
                    Trusted by teams shipping weekly
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {(h.video || heroVideoProject) && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-[34px] opacity-70 blur-2xl"
                  style={{
                    background: "radial-gradient(ellipse at 20% 0%, rgba(255,23,23,0.35), transparent 55%)",
                  }}
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-card shadow-card ring-1 ring-white/[0.04]">
                  <div className="absolute left-0 top-0 z-[2] h-16 w-16 rounded-br-[28px] border-b border-r border-white/10 bg-gradient-to-br from-accent/35 to-transparent" aria-hidden />
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                    {h.video ? (
                      <video
                        className="h-full w-full object-cover"
                        src={h.video}
                        muted
                        playsInline
                        loop
                        preload="auto"
                        controls={false}
                        autoPlay={!reduce}
                      />
                    ) : heroVideoProject.googleDriveFileId ? (
                      <>
                        {heroVideoProject.poster ? (
                          <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src={heroVideoProject.poster}
                            alt=""
                            loading="eager"
                            decoding="async"
                            draggable={false}
                            aria-hidden
                          />
                        ) : null}
                        <iframe
                          title="Featured preview video"
                          className="relative z-[1] h-full w-full border-0 object-cover"
                          src={driveFilePreviewUrl(heroVideoProject.googleDriveFileId, { autoplay: !reduce, loop: !reduce })}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </>
                    ) : (
                      <video
                        className="h-full w-full object-cover"
                        src={heroVideoProject.src}
                        poster={heroVideoProject.poster ?? undefined}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        controls={false}
                        autoPlay={!reduce}
                      />
                    )}
                    <div
                      className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-black/25"
                      aria-hidden
                    />
                  </div>
                  <p className="border-t border-white/10 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {h.video ? h.videoCaption ?? "Featured reel" : heroVideoProject.category}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
