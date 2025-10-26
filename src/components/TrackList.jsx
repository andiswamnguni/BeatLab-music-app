// src/components/TrackList.jsx
import React from "react";
import TrackCard from "./TrackCard";

export default function TrackList({ tracks, onPlay, onAdd, currentTrack }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          onPlay={onPlay}
          onAdd={onAdd}
          isPlaying={currentTrack?.id === track.id}
        />
      ))}
    </div>
  );
}
