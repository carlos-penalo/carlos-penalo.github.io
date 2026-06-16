import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  /**
   * Relative base keeps asset URLs (./assets/...) resilient on GitHub Pages.
   * For a user site at the domain root, "/" also works; "./" avoids occasional blank pages
   * when absolute "/assets/..." requests are misrouted.
   */
  base: "./",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
