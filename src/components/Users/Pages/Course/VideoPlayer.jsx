import { DefaultVideoLayout, defaultLayoutIcons, } from "@vidstack/react/player/layouts/default";
import { MediaPlayer, MediaProvider, Poster, } from "@vidstack/react";

// Helper to Normalize Video URLs (YouTube + Google Drive)
const getVideoSrc = (url) => {
  if (!url) return null;

  // YouTube Watch Links
  if (url.includes("youtube.com/watch")) {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  // YouTube Short Links
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  return url;  // Default (Already Playable Link)
};

const VideoPlayer = ({ lesson, logoUrl }) => {
  const videoSrc = getVideoSrc(lesson?.video);

  if (!videoSrc) {
    return (
      <div className="alert alert-danger text-center text-danger p-4">
        <p>No Video Available for This Lesson.</p>
      </div>
    );
  }

  return (
    <div className="video-player card p-2" onContextMenu={(e) => e.preventDefault()}>
      <img src={logoUrl} alt="Logo" className="video-logo" />
      {/* Vidstack Player */}
      <MediaPlayer src={videoSrc} viewType="video" streamType="on-demand" crossOrigin playsInline autoPlay title={lesson?.title}
        className="w-100 rounded shadow" style={{ overflow: "hidden" }} poster='/images/logo/poster-logo.png'>
        <MediaProvider>
          <Poster className="vds-poster" />
        </MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
};

export default VideoPlayer;