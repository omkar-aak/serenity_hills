import { useState } from "react";
import { Play } from "lucide-react";
import { showcaseVideos } from "../data/homeGrowth";

export default function HomeVideoShowcase() {
  const [activeId, setActiveId] = useState("");
  const video = showcaseVideos[0];

  return (
    <section className="home-video-section compact" id="videos" aria-label="Serenity Hills Dapoli related videos">
      <div className="home-container">
        <div className="home-video-single">
          <div className="home-video-copy">
            <p className="home-eyebrow">Featured walkthrough</p>
            <h2>See the Serenity Hills setting before your site visit.</h2>
            <p>Watch the Dapoli estate atmosphere, hill views, and second-home context in a lightweight click-to-play YouTube embed.</p>
          </div>
          <LiteYouTube video={video} activeId={activeId} onPlay={setActiveId} />
        </div>
      </div>
    </section>
  );
}

function LiteYouTube({ video, activeId, onPlay }) {
  const isActive = activeId === video.id;
  const thumbnail = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <article className="lite-youtube">
      <div className="lite-youtube-frame">
        {isActive ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => onPlay(video.id)} aria-label={`Play ${video.title}`}>
            <img src={thumbnail} alt="" width="480" height="360" loading="lazy" decoding="async" />
            <span><Play size={22} fill="currentColor" /></span>
          </button>
        )}
      </div>
      <div className="lite-youtube-body">
        <small>{video.category}</small>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </article>
  );
}
