import { siteConfig } from "@/config/siteConfig.js";

export function FAQ() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{faq.eyebrow}</p>
        <h2 className="font-medium tracking-tight text-fg text-[clamp(2rem,4vw,3rem)]">{faq.title}</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{faq.lead}</p>

        <div className="mt-10 flex max-w-3xl flex-col gap-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card/90 shadow-card backdrop-blur-sm"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-sm font-semibold text-fg marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="shrink-0 font-medium text-muted">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
