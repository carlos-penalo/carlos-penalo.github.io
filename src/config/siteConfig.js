/**
 * Site-wide copy and links. Replace placeholders marked with TODO.
 */

export const siteConfig = {
  /** TODO: verify spelling / branding */
  name: "Carlos Peñalo",
  role: "Video Editor",

  siteUrl: "https://carlos-penalo.github.io",

  /** TODO: add absolute URL to an OG image in /public/ when ready */
  ogImageUrl: "",

  hero: {
    headline: "Video Editing That Keeps People Watching.",
    subhead:
      "I create engaging motion graphics, SaaS ads, talking-head videos, and performance-driven social media content.",
    primaryCta: "View My Work",
    secondaryCta: "Contact Me",
  },

  contact: {
    headline: "Have a project in mind?",
    subhead:
      "Let’s create something clear, engaging, and impossible to scroll past.",
    /** TODO: replace with your email */
    email: "your.email@example.com",
    /** TODO: replace with your LinkedIn profile URL */
    linkedinUrl: "https://www.linkedin.com/in/YOUR-LINKEDIN-ID/",
    /** Optional — leave empty string to hide the Instagram button */
    instagramUrl: "",
    /**
     * Formspree: create a form at https://formspree.io and paste the form endpoint here.
     * Example: "https://formspree.io/f/xxxxxxxx"
     */
    formspreeEndpoint: "https://formspree.io/f/PLACEHOLDER_FORM_ID",
  },

  about: {
    intro:
      "I’m a video editor with 3+ years of experience creating engaging short-form content for brands, businesses, and creators.",
    body: [
      "I specialize in transforming ideas, scripts, and raw footage into polished videos designed to capture attention and communicate a clear message. My experience covers a wide range of formats, including UGC videos, talking-head content, disruptive Meta ads, promotional campaigns, street interviews, SaaS product videos, and motion-design-driven content.",
      "I can adapt to both clean, simple editing styles and more complex productions involving custom animations, motion graphics, dynamic typography, visual effects, and detailed sound design.",
      "I work primarily with Adobe After Effects and Premiere Pro, handling the full post-production process—from pacing and storytelling to animation, audio enhancement, sound effects, transitions, and final delivery.",
      "My goal is always to create content that looks professional, holds attention, supports the brand’s identity, and delivers results.",
    ],
    skills: [
      "Motion graphics",
      "Social media advertising",
      "SaaS product videos",
      "Talking-head editing",
      "Storytelling",
      "Sound design",
    ],
  },

  process: [
    { title: "Brief", description: "Goals, audience, references, and deliverables aligned up front." },
    { title: "Edit", description: "Pacing, structure, graphics, sound, and polish in the timeline." },
    { title: "Feedback", description: "Focused revisions until the cut matches the vision." },
    { title: "Delivery", description: "Final exports and specs ready for publishing." },
  ],

  /**
   * Category ids must stay in sync with folder names under src/assets/videos/
   * and with overrides in src/data/videoProjects.js
   */
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
