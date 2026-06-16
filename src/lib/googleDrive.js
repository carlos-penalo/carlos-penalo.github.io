/**
 * Google Drive file preview embed (works in iframe, not as <video src>).
 * @param {{ autoplay?: boolean }} [options] — `autoplay` hints the Drive player to start muted when allowed by the browser.
 */
export function driveFilePreviewUrl(fileId, options = {}) {
  if (!fileId || typeof fileId !== "string") return "";
  const id = fileId.trim();
  const base = `https://drive.google.com/file/d/${id}/preview`;
  const params = new URLSearchParams();
  if (options.autoplay) params.set("autoplay", "1");
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

/** Extract file id from a Drive "open file" or /file/d/... URL. */
export function parseDriveFileIdFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
