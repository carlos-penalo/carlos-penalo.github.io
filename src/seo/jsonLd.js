import { siteConfig } from "@/config/siteConfig.js";

export function getPersonJsonLd() {
  const sameAs = [siteConfig.contact.linkedinUrl].filter(Boolean);
  if (siteConfig.contact.instagramUrl) sameAs.push(siteConfig.contact.instagramUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.siteUrl,
    email: siteConfig.contact.email,
    sameAs,
    knowsAbout: siteConfig.about.skills,
  };
}
