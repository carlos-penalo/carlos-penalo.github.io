/**
 * Site copy & structure. Layout/visual language inspired by portfolio templates
 * like CreatorCut (Framer) — not a pixel copy; all content is yours to edit.
 */

export const siteConfig = {
  name: "Carlos Peñalo",
  role: "Video Editor",

  siteUrl: "https://carlos-penalo.github.io",
  ogImageUrl: "",

  /** Top navigation (desktop + mobile panel). */
  nav: {
    links: [
      { href: "#work", label: "Work" },
      { href: "#services", label: "Services" },
      { href: "#portfolio", label: "Projects" },
      { href: "#process", label: "Process" },
      { href: "#about", label: "About" },
    ],
    cta: { href: "#contact", label: "Book call" },
  },

  /** Short strip above the full portfolio grid. */
  workStrip: {
    eyebrow: "Featured",
    title: "Opening sequence",
    lead: "A few hand-picked cuts to set the tone — explore the full grid below.",
  },

  hero: {
    urgency: "Hurry — limited spots this month.",
    headline: "Editing that",
    headlineAccent: "holds attention.",
    subhead:
      "Motion graphics, SaaS spots, talking-head packages, and performance-first social cuts — tuned for clarity, pace, and retention.",
    primaryCta: "View work",
    secondaryCta: "Get in touch",
    statValue: "3+",
    statLabel: "Years shipping edits for brands & creators",
    /** Local looping reel (muted autoplay). Overrides the featured Drive embed. */
    video: "/previews/hero.mp4",
    videoCaption: "Recent client work",
  },

  /** Horizontal “services” strip (CreatorCut-style cards). */
  services: {
    eyebrow: "Services",
    title: "What I take on",
    lead: "End-to-end post for campaigns and channels — from rough cut to polished master.",
    items: [
      {
        title: "Motion & social ads",
        body: "Scroll-stopping Meta ads, hooks, captions-on-brand, and motion passes that survive testing at scale.",
        cta: "See ads",
        href: "#portfolio",
        portfolioFilter: "Facebook Ads",
        visual: "motion",
      },
      {
        title: "SaaS & explainers",
        body: "Product-led story, UI capture, supers, and clean pacing so features read fast on a landing page or demo.",
        cta: "See SaaS",
        href: "#portfolio",
        portfolioFilter: "SaaS ADS",
        visual: "saas",
      },
      {
        title: "Talking-head + GFX",
        body: "Punchy A-roll, lower thirds, chapter beats, and graphics that keep long-form watchable start to finish.",
        cta: "See samples",
        href: "#portfolio",
        portfolioFilter: "Talking Head Motion Graphics",
        visual: "talk",
      },
      {
        title: "Finish & delivery",
        body: "Sound polish, mix, loudness-safe exports, and delivery specs matched to YouTube, Meta, or internal review.",
        cta: "Process",
        href: "#process",
        visual: "compare",
      },
    ],
  },

  featuredWork: {
    eyebrow: "Projects",
    title: "Selected editing work",
    lead: "A mix of formats — open any piece for full playback.",
  },

  portfolioTeaser: {
    eyebrow: "Browse",
    title: "Filter by category",
    lead: "Tap a lane to refocus the grid. Everything updates in place.",
  },

  whyMe: {
    eyebrow: "Why me",
    title: 'More than just "cutting" footage.',
    lead: "Every frame is shaped with intention — pacing, motion, color, and sound working together.",
    pillars: [
      {
        title: "Retention-first",
        body: "Edits structured so the message lands before thumbs scroll away.",
      },
      {
        title: "Platform-native",
        body: "Layouts and rhythm tuned for feeds, demos, and long-form — not one-size-fits-all.",
      },
      {
        title: "Predictable delivery",
        body: "Clear milestones, organized assets, and exports that match your review chain.",
      },
    ],
  },

  stats: {
    eyebrow: "Numbers",
    title: "At a glance",
    items: [
      { value: "3+", label: "Years editing" },
      { value: "24+", label: "Clips in this portfolio" },
      { value: "100%", label: "Remote-friendly" },
      { value: "AE + PR", label: "Primary toolchain" },
    ],
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "Trusted by teams",
    lead: "Placeholder quotes — swap for real client feedback when you have permission.",
    items: [
      {
        name: "Brand lead",
        quote: "Clear storytelling and fast iterations — the ads shipped on time for our launch window.",
      },
      {
        name: "Marketing manager",
        quote: "Motion passes elevated our SaaS demo without feeling busy. Exactly what we needed for paid social.",
      },
      {
        name: "Creator",
        quote: "Talking-head episodes finally feel tight. Viewers stay through the CTA.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    lead: "Quick answers — email me for specifics on your timeline and scope.",
    items: [
      {
        q: "What do you need to start?",
        a: "Brief, references, script or outline, and a shared drive (or links) with usable footage and brand assets.",
      },
      {
        q: "How do revisions work?",
        a: "We align on a direction early, then iterate in focused rounds so feedback stays actionable.",
      },
      {
        q: "Can you match an existing style?",
        a: "Yes — send reference edits or brand guidelines and I’ll match pacing, typography, and motion language.",
      },
      {
        q: "Typical turnaround?",
        a: "Depends on length and complexity; short social cuts are usually faster than long-form packages. Ask with your dates.",
      },
    ],
  },

  process: [
    {
      step: "01",
      title: "Brief & assets",
      description: "Goals, audience, references, and a clean handoff of footage and brand rules.",
    },
    {
      step: "02",
      title: "Edit & motion",
      description: "Structure, pacing, graphics, captions, and sound design in the timeline.",
    },
    {
      step: "03",
      title: "Feedback",
      description: "Focused revision rounds until the cut matches the agreed direction.",
    },
    {
      step: "04",
      title: "Delivery",
      description: "Masters and variants exported for the platforms you publish on.",
    },
  ],

  about: {
    eyebrow: "About",
    title: "About me",
    intro:
      "I’m a video editor focused on turning scripts and footage into edits people actually finish — for brands, SaaS, and creators.",
    body: [
      "I specialize in motion-forward social ads, product explainers, talking-head packages, and polished short-form. The through-line is clarity: what should the viewer feel, know, or do next?",
      "I work in After Effects and Premiere Pro — from rough assembly to GFX, mix prep, and final exports that match your review workflow.",
    ],
    skills: [
      "Motion graphics",
      "Social / Meta ads",
      "SaaS explainers",
      "Talking-head",
      "Sound design",
      "Delivery specs",
    ],
  },

  processSection: {
    eyebrow: "Process",
    title: "From raw file to render",
    lead: "A straightforward path so projects stay predictable.",
  },

  contact: {
    headline: "Book a call",
    subhead: "Tell me about your timeline, platforms, and what “done” looks like — I’ll reply with next steps.",
    email: "capx86@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/carlos-pe%C3%B1alo-9a797228a/",
    /** Optional — shown in footer when set. */
    youtubeUrl: "",
    phone: "+1 849-220-6301",
    /** @capmediaae */
    xUrl: "https://x.com/capmediaae",
    /** @capmedia_ae */
    instagramUrl: "https://www.instagram.com/capmedia_ae/",
    formspreeEndpoint: "https://formspree.io/f/xvznlnel",
  },

  /** Closing CTA band above footer. */
  finalCta: {
    title: "Ready to ship your next cut?",
    lead: "Let’s turn your brief and footage into edits that read fast — ads, explainers, or long-form.",
    primary: "Book a call",
    secondary: "View my work",
  },

  /** Short line under logo in footer. */
  footerTagline:
    "Motion-forward editing for brands, SaaS, and creators — built for retention, clarity, and delivery you can trust.",

  categories: [
    {
      id: "Talking Head Motion Graphics",
      shortLabel: "Talking Head",
      description: "Dynamic talking-head edits with motion graphics and typography.",
    },
    {
      id: "Simple Style",
      shortLabel: "Simple Style",
      description: "Clean, minimal cuts where the message leads.",
    },
    {
      id: "SaaS ADS",
      shortLabel: "SaaS Ads",
      description: "Product-led explainers and SaaS campaign spots.",
    },
    {
      id: "Facebook Ads",
      shortLabel: "Facebook Ads",
      description: "Scroll-stopping Meta ads built for testing and scale.",
    },
  ],
};
