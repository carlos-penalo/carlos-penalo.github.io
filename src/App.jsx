import { useEffect, useMemo, useState } from "react";
import { PreviewVideoProvider } from "@/context/PreviewVideoContext.jsx";
import { siteConfig } from "@/config/siteConfig.js";
import { videoProjects, getCategoryCounts } from "@/data/videoProjects.js";
import { getPersonJsonLd } from "@/seo/jsonLd.js";
import { Navbar } from "@/components/Navbar.jsx";
import { Hero } from "@/components/Hero.jsx";
import { FeaturedWork } from "@/components/FeaturedWork.jsx";
import { CategoryShowcase } from "@/components/CategoryShowcase.jsx";
import { PortfolioSection } from "@/components/PortfolioSection.jsx";
import { About } from "@/components/About.jsx";
import { Process } from "@/components/Process.jsx";
import { Contact } from "@/components/Contact.jsx";
import { Footer } from "@/components/Footer.jsx";
import { VideoModal } from "@/components/VideoModal.jsx";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState({ open: false, playlist: [], index: 0 });

  const filtered = useMemo(
    () => (filter === "all" ? videoProjects : videoProjects.filter((p) => p.category === filter)),
    [filter]
  );

  const counts = useMemo(() => getCategoryCounts(videoProjects), []);

  const heroVideo = useMemo(
    () => videoProjects.find((p) => p.featured) ?? videoProjects[0] ?? null,
    []
  );

  const openModal = (project, playlist) => {
    const list = Array.isArray(playlist) && playlist.length ? playlist : videoProjects;
    const index = list.findIndex((p) => p.id === project.id);
    setModal({ open: true, playlist: [...list], index: Math.max(0, index) });
  };

  const handleCategoryPick = (catId) => {
    setFilter(catId);
    window.requestAnimationFrame(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    const id = "jsonld-person";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(getPersonJsonLd());

    const ogUrl = siteConfig.ogImageUrl?.trim();
    if (ogUrl) {
      let og = document.querySelector('meta[property="og:image"]');
      if (!og) {
        og = document.createElement("meta");
        og.setAttribute("property", "og:image");
        document.head.appendChild(og);
      }
      og.setAttribute("content", ogUrl);
    }
  }, []);

  return (
    <PreviewVideoProvider>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Navbar />
      <main>
        <Hero heroVideoProject={heroVideo} />
        <FeaturedWork projects={videoProjects} onOpenProject={openModal} />
        <CategoryShowcase counts={counts} activeFilter={filter} onSelectCategory={handleCategoryPick} />
        <PortfolioSection
          projects={filtered}
          activeFilter={filter}
          onFilterChange={setFilter}
          onOpenProject={openModal}
        />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      <VideoModal
        open={modal.open}
        playlist={modal.playlist}
        activeIndex={modal.index}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        onNavigate={(index) => setModal((m) => ({ ...m, index }))}
      />
    </PreviewVideoProvider>
  );
}
