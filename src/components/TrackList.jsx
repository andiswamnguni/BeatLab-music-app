import React from "react";
import TrackCard from "./TrackCard";

export default function TrackList({ tracks, onPlay, onAdd }) {
  return (
    <div className="mt-4">
      {tracks.length === 0 ? <p>No tracks found</p> : tracks.map(track => (
        <TrackCard key={track.id} track={track} onPlay={onPlay} onAdd={onAdd} />
      ))}
    </div>
  );
}
