"use client";

import { useRef, useState } from "react";

export default function StoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function enableSound() {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.volume = 1;
    void videoRef.current.play();
    setMuted(false);
  }

  return (
    <div className="video-frame">
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        loop
        controls
        playsInline
        preload="metadata"
        poster="/video-poster.jpg"
        aria-label="Melissa Cubillas live at the 2026 Expo"
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
      >
        <source src="/melissa-expo-story.mp4" type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      {muted && (
        <button className="sound-cue" type="button" onClick={enableSound}>
          <span aria-hidden="true">◖</span> Tap for sound
        </button>
      )}
      <div className="video-caption"><span>01</span> Melissa live · 2026 Expo</div>
    </div>
  );
}
