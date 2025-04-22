// Create a VideoPlayer component
"use client";
import React from "react";

const VideoPlayer = ({ src, type = "parking" }) => {
  // These would be your actual video paths
  const videoSources = {
    parking: {
      1: "/videos/parking-area.mp4",
      2: "/videos/parking-cars.mp4",
    },
    crowd: {
      1: "/videos/crowd-all.mp4",
      2: "/videos/crowd-yolo.mp4",
    },
  };

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
      <video
        controls
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video overlay indicator */}
      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
        {type === "parking" ? "Parking Guide" : "Crowd Navigation"}
      </div>
    </div>
  );
};

export default VideoPlayer;
