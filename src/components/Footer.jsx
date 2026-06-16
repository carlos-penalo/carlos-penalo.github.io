import { Clapperboard } from "lucide-react";
import { siteConfig } from "@/config/siteConfig.js";

function scrollToHash(hash) {
  const id = hash.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Footer() {
  const year = new Date().getFullYear();
  const { nav, contact, footerTagline } = siteConfig;
  const showInstagram = Boolean(contact.instagramUrl?.trim());
  const showX = Boolean(contact.xUrl?.trim());
  const showYoutube = Boolean(contact.youtubeUrl?.trim());
  const phone = typeof contact.phone === "string" ? contact.phone.trim() : "";
  const phoneTel = phone ? `tel:+${phone.replace(/\D/g, "")}` : "";

  return (
    <footer className="border-t border-white/10 bg-black/40 px-4 py-16 md:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
              <Clapperboard className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="m-0 font-semibold tracking-tight text-fg">{siteConfig.name}</p>
              <p className="m-0 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{siteConfig.role}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">{footerTagline}</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-semibold text-muted" aria-label="Footer">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="w-fit transition hover:text-fg"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash(l.href);
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="w-fit text-accent transition hover:text-fg"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash(nav.cta.href);
            }}
          >
            {nav.cta.label}
          </a>
        </nav>

        <div className="flex flex-col gap-3 text-sm text-muted">
          <a href={contact.linkedinUrl} className="w-fit transition hover:text-fg" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {showX ? (
            <a href={contact.xUrl} className="w-fit transition hover:text-fg" target="_blank" rel="noreferrer">
              X
            </a>
          ) : null}
          {showYoutube ? (
            <a href={contact.youtubeUrl} className="w-fit transition hover:text-fg" target="_blank" rel="noreferrer">
              YouTube
            </a>
          ) : null}
          {showInstagram ? (
            <a href={contact.instagramUrl} className="w-fit transition hover:text-fg" target="_blank" rel="noreferrer">
              Instagram
            </a>
          ) : null}
          <a href={`mailto:${contact.email}`} className="w-fit transition hover:text-fg">
            {contact.email}
          </a>
          {phoneTel ? (
            <a href={phoneTel} className="w-fit transition hover:text-fg">
              {phone}
            </a>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted md:flex-row md:items-center">
        <span>© {year} {siteConfig.name}. All rights reserved.</span>
        <button
          type="button"
          className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-fg transition hover:border-white/25"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
