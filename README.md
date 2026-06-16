# Carlos Peñalo — Video Editor Portfolio

A lightweight **React + Vite** portfolio for GitHub Pages. **Videos are loaded by public HTTPS URLs** you list in [`src/data/manualVideos.js`](src/data/manualVideos.js) — you do **not** need video files in the repository or on your PC for the site to work. Styling uses **Tailwind CSS** (v4 via `@tailwindcss/vite`); motion uses **Framer Motion**; icons use **Lucide React**.

Optionally, you can still drop small `.mp4` / `.webm` / `.mov` samples under `src/assets/videos/` for local experiments; those paths are **gitignored** by default so they are not committed.

Live site (after deployment): [https://carlos-penalo.github.io](https://carlos-penalo.github.io)

---

## 1. Repository name

Create or rename your GitHub repository to:

`carlos-penalo.github.io`

This matches a **GitHub user site** (`username.github.io`). Asset paths use a **relative** Vite `base` (`./` in [`vite.config.js`](vite.config.js)).

---

## 2. Videos without storing them on your PC (recommended)

1. Upload each clip to any host that gives a **direct HTTPS link** to the file (Cloudflare R2, AWS S3 public, Bunny.net, Backblaze B2, your own server, etc.).
2. Edit [`src/data/manualVideos.js`](src/data/manualVideos.js) and add one object per clip to **`manualVideoProjects`**:
   - **`title`** — display name  
   - **`category`** — must match **exactly** one of: `Talking Head Motion Graphics`, `Simple Style`, `SaaS ADS`, `Facebook Ads`  
   - **`src`** — `https://...` URL to the video file  
   - Optional: `id`, `description`, `featured`, `order`, `poster`
3. Run `npm run dev` or push to GitHub — the player loads the remote URL; **no local copies** are required.

### Sin vídeos en tu ordenador

No hace falta tener carpetas con MP4 en el PC: solo enlaces públicos en **`manualVideos.js`**. El repositorio puede pesar pocos megabytes y `git push` es estable.

### Optional local samples (gitignored)

If you want to preview a file only on your machine, you may place files under:

`src/assets/videos/<Category folder>/`

Patterns under `src/assets/videos/**` for `*.mp4`, `*.webm`, and `*.mov` are listed in [`.gitignore`](.gitignore) so they are **not** committed. Remove those lines from `.gitignore` only if you intentionally want binaries in Git (not recommended for large masters).

### Large videos and failed `git push` (e.g. `HTTP 500`, `RPC failed`)

Do **not** commit multi‑gigabyte raw `.mp4` files in normal Git.

**Option A — Git LFS** (still keeps binaries in GitHub’s ecosystem): see [Git LFS](https://git-lfs.github.com/). The workflow checks out with `lfs: true`.

**Option B — Remote URLs only (default for this README):** use **`manualVideoProjects`** only; keep video folders **out** of Git (see `.gitignore`).

If you already committed huge files locally, undo and untrack before pushing again:

```powershell
git reset --mixed HEAD~1
git rm -r --cached facebookAds saasAds simpleStyle talkingHeadMotionGraphics 2>$null
# then commit code + manualVideos.js only
```

---

## 3. Local development

```powershell
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```powershell
npm run build
```

Output is written to `dist/`.

---

## 4. Configure your details

### `src/config/siteConfig.js`

Replace placeholders (search for **TODO** in that file):

- **Email**, **LinkedIn** URL, optional **Instagram** URL  
- **`formspreeEndpoint`** — create a form at [Formspree](https://formspree.io) and paste the endpoint URL  
- Optional **`ogImageUrl`** — absolute URL to an Open Graph image (you can host under `public/` and point to `https://carlos-penalo.github.io/...`)

Headline, bio, process copy, and category blurbs are editable there as well.

### `src/data/videoProjects.js`

- **`projectOverrides`** — still supported if you use optional files under `src/assets/videos/`; keys are **filenames**.

### `src/data/manualVideos.js`

Primary catalog when using **remote-only** video: see comments in that file.

---

## 5. Deploy to GitHub Pages (GitHub Actions)

1. Push this project to GitHub (repository name: **`carlos-penalo.github.io`**).
2. In the repository on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. Ensure your default branch is **`main`** or **`master`** (the workflow triggers on pushes to those branches). Adjust [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) if you use another branch name.
5. Push a commit (or run **Actions → Deploy to GitHub Pages → Run workflow**) and wait for the workflow to finish.
6. Visit **https://carlos-penalo.github.io**

The workflow runs `npm ci`, `npm run build`, and publishes the **`dist`** folder to Pages.

**First-time setup:** GitHub may ask you to approve **Pages** for the repo the first time the workflow runs.

### Site looks like a plain GitHub placeholder (title link, bare text, or blank page)

That means GitHub is **not** serving the **built** Vite app (`dist/`). The source [`index.html`](index.html) in the repo is for Vite dev; production is the **Actions** output.

1. **Settings → Pages → Source:** **GitHub Actions**.
2. **Actions** tab: **Deploy to GitHub Pages** must succeed (green).
3. Approve **github-pages** environment if prompted; re-run the workflow if needed.
4. Hard-refresh (`Ctrl+F5`) after deploy.

5. **Pantalla en blanco / blank page:** **F12 → Network** — if `assets/index-*.js` is **404**, Pages is not serving `dist`. If JS is **200** but the page is blank, check **Console** for errors.

`public/.nojekyll` is included for static hosting edge cases.

---

## 6. SEO & static files

- **`index.html`** — title, description, Open Graph, Twitter card, canonical URL  
- **`public/robots.txt`**, **`public/sitemap.xml`**  
- **`public/favicon.svg`** — replace with your own mark if you like  
- **JSON-LD** (`Person`) is injected at runtime from `src/seo/jsonLd.js` using values from `siteConfig`

---

## 7. Project structure (overview)

```
carlos-penalo.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── .nojekyll
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── videos/          # optional local samples (video files gitignored)
│   ├── components/
│   ├── config/
│   │   └── siteConfig.js
│   ├── context/
│   ├── data/
│   │   ├── manualVideos.js  # primary: remote HTTPS URLs
│   │   └── videoProjects.js
│   ├── hooks/
│   ├── seo/
│   ├── App.jsx
│   ├── main.jsx
│   ├── ErrorBoundary.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 8. Placeholder checklist (replace before launch)

| Item | Location |
|------|-----------|
| Video URLs + titles + categories | `src/data/manualVideos.js` → `manualVideoProjects` |
| Email, LinkedIn, Instagram, YouTube | `src/config/siteConfig.js` → `contact` |
| Featured strip copy (above grid) | `siteConfig.workStrip` |
| Closing CTA + footer tagline | `siteConfig.finalCta`, `siteConfig.footerTagline` |
| Formspree endpoint | `src/config/siteConfig.js` → `contact.formspreeEndpoint` |
| Open Graph image URL (optional) | `src/config/siteConfig.js` → `ogImageUrl` |
| Overrides if using local files | `src/data/videoProjects.js` → `projectOverrides` |

---

## 9. Accessibility & performance notes

- Respects **`prefers-reduced-motion`** for Framer Motion where used.  
- Inline previews are **muted**; modal playback uses native **controls** (visitor can enable sound).  
- **Single active hover preview** on fine pointers; **no hover autoplay** on coarse pointers / touch — open the modal to watch.  
- Videos use **`preload="metadata"`**, **`playsInline`**, and leave-viewport / hover-leave **pause** behavior where applicable.

---

## License

Private portfolio — adjust as you see fit.
