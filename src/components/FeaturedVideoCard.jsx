import { VideoCard } from "./VideoCard.jsx";

/** Featured cards now use the portrait grid card (title + category header, click opens full video). */
export function FeaturedVideoCard({ project, onOpen }) {
  return <VideoCard project={project} onOpen={onOpen} variant="grid" />;
}
