import { siteConfig } from "@/config/siteConfig.js";

export function getPersonJsonLd() {
  const sameAs = [siteConfig.contact.linkedinUrl].filter(Boolean);
  if (siteConfig.contact.instagramUrl) sameAs.push(siteConfig.contact.instagramUrl);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.siteUrl,
    email: siteConfig.contact.email,
    sameAs,
    knowsAbout: siteConfig.about.skills,
  };
  if (siteConfig.contact.phone?.trim()) {
    const digits = siteConfig.contact.phone.replace(/\D/g, "");
    if (digits) person.telephone = `+${digits}`;
  }
  return person;
}
