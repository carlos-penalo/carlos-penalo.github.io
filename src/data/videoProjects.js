import { siteConfig } from "@/config/siteConfig.js";

/**
 * Optional per-file overrides. Keys are filenames only (e.g. "my-project.mp4").
 * You can also key by basename including extension variants.
 *
 * Fields:
 * - title, description, featured (boolean), order (number, lower first),
 * - category (must match a category id in siteConfig.categories),
 * - poster: optional URL string (e.g. import a jpg in this file and assign)
 */
export const projectOverrides = {
  // Example:
  // "saas-ai-platform-ad.mp4": {
  //   title: "SaaS AI Platform Ad",
  //   description: "Product launch spot.",
  //   featured: true,
  //   order: 1,
  // },
};

const CANONICAL_IDS = new Set(siteConfig.categories.map((c) => c.id));

/** If you drop legacy folder names into src/assets/videos/, they still map correctly. */
const LEGACY_FOLDER_TO_CATEGORY = {
  talkingheadmotiongraphics: "Talking Head Motion Graphics",
  talkingHeadMotionGraphics: "Talking Head Motion Graphics",
  simplestyle: "Simple Style",
  simpleStyle: "Simple Style",
  saasads: "SaaS ADS",
  saasAds: "SaaS ADS",
  facebookads: "Facebook Ads",
  facebookAds: "Facebook Ads",
};

const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "if",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "so",
  "the",
  "to",
  "up",
  "yet",
]);

function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

function slugifyId(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromFilename(filename) {
  const base = filename
    .replace(/\.[^.]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!base) return filename;
  const words = base.split(" ");
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i !== 0 && i !== words.length - 1 && SMALL_WORDS.has(lower)) {
        return lower;
      }
      if (/^[0-9]/.test(word)) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function extractCategoryAndFilename(normalizedPath) {
  const marker = "/assets/videos/";
  const idx = normalizedPath.toLowerCase().indexOf(marker);
  const tail = idx >= 0 ? normalizedPath.slice(idx + marker.length) : normalizedPath;
  const parts = tail.split("/").filter(Boolean);
  if (parts.length < 2) return { categoryFolder: "", filename: parts[0] || "" };
  const filename = parts[parts.length - 1];
  const categoryFolder = parts.slice(0, -1).join("/") || parts[0];
  return { categoryFolder, filename };
}

function resolveCategory(folderSegment) {
  const last = folderSegment.includes("/") ? folderSegment.split("/").pop() : folderSegment;
  if (CANONICAL_IDS.has(last)) return last;
  const legacy = LEGACY_FOLDER_TO_CATEGORY[last];
  if (legacy && CANONICAL_IDS.has(legacy)) return legacy;
  const lower = last.replace(/\s+/g, "").toLowerCase();
  for (const id of CANONICAL_IDS) {
    if (id.replace(/\s+/g, "").toLowerCase() === lower) return id;
  }
  return last || "Uncategorized";
}

const rawModules = import.meta.glob("../assets/videos/**/*.{mp4,webm,mov}", {
  eager: true,
  query: "?url",
  import: "default",
});

if (import.meta.env.DEV) {
  for (const path of Object.keys(rawModules)) {
    if (/\.mov$/i.test(path)) {
      // eslint-disable-next-line no-console
      console.warn(
        "[portfolio] .mov files can be unreliable in browsers. Prefer .mp4 or .webm for production:",
        path
      );
    }
  }
}

function buildVideoProjects() {
  const list = [];

  for (const [rawPath, url] of Object.entries(rawModules)) {
    const normalizedPath = normalizePath(rawPath);
    const { categoryFolder, filename } = extractCategoryAndFilename(normalizedPath);
    const category = resolveCategory(categoryFolder);
    const override = projectOverrides[filename] || projectOverrides[filename.toLowerCase()] || {};

    const title = override.title ?? titleFromFilename(filename);
    const id = override.id ?? slugifyId(`${category}-${filename}`);
    const src = typeof url === "string" ? url : String(url?.default ?? url ?? "");

    list.push({
      id,
      title,
      filename,
      category: override.category ?? category,
      description: override.description ?? "",
      src,
      poster: override.poster ?? null,
      featured: Boolean(override.featured),
      order: typeof override.order === "number" ? override.order : 999,
    });
  }

  list.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  return list;
}

export const videoProjects = buildVideoProjects();

export function getCategoryCounts(projects) {
  const counts = {};
  for (const c of siteConfig.categories) counts[c.id] = 0;
  for (const p of projects) {
    if (counts[p.category] !== undefined) counts[p.category] += 1;
  }
  return counts;
}
