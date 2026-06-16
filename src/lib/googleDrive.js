/**
 * Google Drive file preview embed (works in iframe, not as <video src>).
 * @param {{ autoplay?: boolean; loop?: boolean }} [options] — `autoplay` / `loop` are hints for the Drive player (support varies by browser).
 */
export function driveFilePreviewUrl(fileId, options = {}) {
  if (!fileId || typeof fileId !== "string") return "";
  const id = fileId.trim();
  const base = `https://drive.google.com/file/d/${id}/preview`;
  const params = new URLSearchParams();
  if (options.autoplay) params.set("autoplay", "1");
  if (options.loop) params.set("loop", "1");
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

/**
 * Static frame URL for cards / posters ("anyone with link" files usually work).
 * Falls back gracefully if the file blocks thumbnails (handle `img` onError in UI).
 */
export function driveThumbnailUrl(fileId, maxWidth = 960) {
  if (!fileId || typeof fileId !== "string") return "";
  const id = fileId.trim();
  const w = Math.min(Math.max(Number(maxWidth) || 960, 320), 2000);
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${w}`;
}

/** Extract file id from a Drive "open file" or /file/d/... URL. */
export function parseDriveFileIdFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
