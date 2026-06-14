# Carlos Peñalo — Video Editor Portfolio

A lightweight **React + Vite** portfolio for GitHub Pages. Videos are discovered at build time from `src/assets/videos/` via `import.meta.glob`. Animations use **Framer Motion**; icons use **Lucide React**.

Live site (after deployment): [https://carlos-penalo.github.io](https://carlos-penalo.github.io)

---

## 1. Repository name

Create or rename your GitHub repository to:

`carlos-penalo.github.io`

This matches a **GitHub user site** (`username.github.io`), which is served from the repository root with **`base: "/"`** (already set in `vite.config.js`).

---

## 2. Where to put your videos

Place your four folders **inside**:

`src/assets/videos/`

Use **exact** folder names (case-sensitive on some systems):

| Folder |
|--------|
| `Talking Head Motion Graphics` |
| `Simple Style` |
| `SaaS ADS` |
| `Facebook Ads` |

Supported file extensions: **`.mp4`**, **`.webm`**, **`.mov`**

> **Note:** `.mov` can be unreliable in browsers. In development, the app logs a warning if any `.mov` is imported. Prefer **`.mp4`** or **`.webm`** for production.

### Migrating from this repo’s old layout

If you previously kept videos at the repository root (`facebookAds`, `saasAds`, `simpleStyle`, `talkingHeadMotionGraphics`), move and rename them into `src/assets/videos/` as above. The importer also recognizes those **legacy folder names** if you temporarily keep them under `src/assets/videos/`, but the recommended layout is the four canonical folder names.

You can delete the `.gitkeep` files once each folder contains real media.

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

- **`projectOverrides`** — keyed by **filename** (e.g. `"my-spot.mp4"`). Use to set:

  - `title`, `description`, `featured`, `order`, `poster`, or override `category`

- Titles are auto-generated from filenames (e.g. `saas-ai-platform-ad.mp4` → `SaaS AI Platform Ad`).

If glob discovery ever mis-detects a category, set `category` explicitly in the override for that file.

---

## 5. Deploy to GitHub Pages (GitHub Actions)

1. Push this project to GitHub (repository name: **`carlos-penalo.github.io`**).
2. In the repository on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. Ensure your default branch is **`main`** or **`master`** (the workflow triggers on pushes to those branches). Adjust `.github/workflows/deploy.yml` if you use another branch name.
5. Push a commit (or run **Actions → Deploy to GitHub Pages → Run workflow**) and wait for the workflow to finish.
6. Visit **https://carlos-penalo.github.io**

The workflow (`.github/workflows/deploy.yml`) runs `npm ci`, `npm run build`, and publishes the **`dist`** folder to Pages.

**First-time setup:** GitHub may ask you to approve **Pages** for the repo the first time the workflow runs.

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
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── videos/
│   │       ├── Talking Head Motion Graphics/
│   │       ├── Simple Style/
│   │       ├── SaaS ADS/
│   │       └── Facebook Ads/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── CategoryFilters.jsx
│   │   ├── CategoryShowcase.jsx
│   │   ├── Contact.jsx
│   │   ├── FeaturedVideoCard.jsx
│   │   ├── FeaturedWork.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── PortfolioGrid.jsx
│   │   ├── PortfolioSection.jsx
│   │   ├── Process.jsx
│   │   ├── VideoCard.jsx
│   │   └── VideoModal.jsx
│   ├── config/
│   │   └── siteConfig.js
│   ├── context/
│   │   └── PreviewVideoContext.jsx
│   ├── data/
│   │   └── videoProjects.js
│   ├── hooks/
│   │   └── useHoverCapable.js
│   ├── seo/
│   │   └── jsonLd.js
│   ├── App.jsx
│   ├── main.jsx
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
| Email, LinkedIn, Instagram | `src/config/siteConfig.js` → `contact` |
| Formspree endpoint | `src/config/siteConfig.js` → `contact.formspreeEndpoint` |
| Open Graph image URL (optional) | `src/config/siteConfig.js` → `ogImageUrl` |
| Featured projects & custom titles | `src/data/videoProjects.js` → `projectOverrides` |
| Video files | `src/assets/videos/<Category>/` |

---

## 9. Accessibility & performance notes

- Respects **`prefers-reduced-motion`** for Framer Motion where used.  
- Inline previews are **muted**; modal playback uses native **controls** (visitor can enable sound).  
- **Single active hover preview** on fine pointers; **no hover autoplay** on coarse pointers / touch — open the modal to watch.  
- Videos use **`preload="metadata"`**, **`playsInline`**, and leave-viewport / hover-leave **pause** behavior to avoid wasting bandwidth.

---

## License

Private portfolio — adjust as you see fit.
