import { siteConfig } from "@/config/siteConfig.js";
import { driveThumbnailUrl, parseDriveFileIdFromUrl } from "@/lib/googleDrive.js";
import { manualVideoProjects } from "./manualVideos.js";

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

/** Optional: only if you keep small samples under src/assets/videos/ (not required). */
const rawUnderAssets = import.meta.glob("../assets/videos/**/*.{mp4,webm,mov}", {
  eager: true,
  query: "?url",
  import: "default",
});

function parseVideoGlobPath(rawPath) {
  const n = normalizePath(rawPath);
  const marker = "/assets/videos/";
  const mi = n.toLowerCase().indexOf(marker);
  if (mi < 0) return null;
  const tail = n.slice(mi + marker.length);
  const parts = tail.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const filename = parts[parts.length - 1];
  const categoryFolder = parts.slice(0, -1).join("/") || parts[0];
  return { filename, categoryFolder };
}

if (import.meta.env.DEV) {
  for (const path of Object.keys(rawUnderAssets)) {
    if (/\.mov$/i.test(path)) {
      // eslint-disable-next-line no-console
      console.warn(
        "[portfolio] .mov files can be unreliable in browsers. Prefer .mp4 or .webm for production:",
        path
      );
    }
  }
}

function normalizeManualVideo(raw) {
  if (!raw) return null;

  const category = raw.category;
  if (!category || !CANONICAL_IDS.has(category)) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[portfolio] manualVideoProjects: invalid or unknown category:", raw);
    }
    return null;
  }

  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  if (!title) return null;

  const driveIdFromField =
    typeof raw.googleDriveFileId === "string" ? raw.googleDriveFileId.trim() : "";
  const driveLink = typeof raw.driveViewUrl === "string" ? raw.driveViewUrl : "";
  const srcField = typeof raw.src === "string" ? raw.src.trim() : "";

  const driveId =
    driveIdFromField ||
    parseDriveFileIdFromUrl(driveLink) ||
    (srcField.includes("drive.google.com/file") ? parseDriveFileIdFromUrl(srcField) : null);

  const directSrc =
    srcField.startsWith("http") && !srcField.includes("drive.google.com/file") ? srcField : null;

  if (!driveId && !directSrc) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[portfolio] manualVideoProjects: need driveViewUrl / googleDriveFileId or direct https src:", raw);
    }
    return null;
  }

  const filename = typeof raw.filename === "string" ? raw.filename : `${slugifyId(title)}.mp4`;
  const id = raw.id ? String(raw.id) : slugifyId(`${category}-${driveId ?? filename}`);

  const explicitPoster =
    typeof raw.poster === "string" && raw.poster.trim() ? raw.poster.trim() : null;
  const posterFromDrive = driveId ? driveThumbnailUrl(driveId, 1200) : null;

  const previewSrc =
    typeof raw.previewSrc === "string" && raw.previewSrc.trim() ? raw.previewSrc.trim() : null;

  return {
    id,
    title,
    filename,
    category,
    description: typeof raw.description === "string" ? raw.description : "",
    src: directSrc ?? "",
    googleDriveFileId: driveId || null,
    poster: explicitPoster ?? posterFromDrive,
    previewSrc,
    featured: Boolean(raw.featured),
    featuredOrder: typeof raw.featuredOrder === "number" ? raw.featuredOrder : null,
    order: typeof raw.order === "number" ? raw.order : 998,
  };
}

function buildProjectEntry(rawPath, url) {
  const normalizedPath = normalizePath(rawPath);
  const parsed = parseVideoGlobPath(normalizedPath);
  if (!parsed) return null;

  const category = resolveCategory(parsed.categoryFolder);
  const filename = parsed.filename;
  const override = projectOverrides[filename] || projectOverrides[filename.toLowerCase()] || {};

  const title = override.title ?? titleFromFilename(filename);
  const id = override.id ?? slugifyId(`${category}-${filename}`);
  const src = typeof url === "string" ? url : String(url?.default ?? url ?? "");

  return {
    id,
    title,
    filename,
    category: override.category ?? category,
    description: override.description ?? "",
    src,
    googleDriveFileId: null,
    poster: override.poster ?? null,
    previewSrc: typeof override.previewSrc === "string" ? override.previewSrc : null,
    featured: Boolean(override.featured),
    featuredOrder: typeof override.featuredOrder === "number" ? override.featuredOrder : null,
    order: typeof override.order === "number" ? override.order : 999,
  };
}

function buildVideoProjects() {
  const byId = new Map();

  for (const [rawPath, url] of Object.entries(rawUnderAssets)) {
    const entry = buildProjectEntry(rawPath, url);
    if (entry) byId.set(entry.id, entry);
  }

  for (const raw of manualVideoProjects) {
    const entry = normalizeManualVideo(raw);
    if (entry) byId.set(entry.id, entry);
  }

  const list = Array.from(byId.values());

  list.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  if (import.meta.env.DEV && list.length === 0) {
    // eslint-disable-next-line no-console
    console.info(
      "[portfolio] No videos yet. Add HTTPS entries to src/data/manualVideos.js (see README). Optional local samples may live under src/assets/videos/."
    );
  }

  return list;
}

export const videoProjects = buildVideoProjects();

/** Featured strip order (lower first). Entries without `featuredOrder` sort after those that have it. */
export function getFeaturedProjectsSorted(projects) {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const ao = typeof a.featuredOrder === "number" ? a.featuredOrder : 999;
      const bo = typeof b.featuredOrder === "number" ? b.featuredOrder : 999;
      if (ao !== bo) return ao - bo;
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
}

export function getCategoryCounts(projects) {
  const counts = {};
  for (const c of siteConfig.categories) counts[c.id] = 0;
  for (const p of projects) {
    if (counts[p.category] !== undefined) counts[p.category] += 1;
  }
  return counts;
}
