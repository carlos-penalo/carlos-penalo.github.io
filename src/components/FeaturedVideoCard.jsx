import { VideoCard } from "./VideoCard.jsx";

/** First featured card spans 2 cols — use a taller variant for visual rhythm. */
export function FeaturedVideoCard({ project, onOpen }) {
  return <VideoCard project={project} onOpen={onOpen} variant="featured" footerCategoryOnly />;
}
