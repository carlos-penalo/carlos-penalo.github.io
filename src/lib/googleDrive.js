/** Google Drive file preview embed (works in iframe, not as <video src>). */
export function driveFilePreviewUrl(fileId) {
  if (!fileId || typeof fileId !== "string") return "";
  const id = fileId.trim();
  return `https://drive.google.com/file/d/${id}/preview`;
}

/** Extract file id from a Drive "open file" or /file/d/... URL. */
export function parseDriveFileIdFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
