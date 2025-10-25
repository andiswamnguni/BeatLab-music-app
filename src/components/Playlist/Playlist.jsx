import React from "react";
import { usePlaylist } from "../../context/PlaylistContext";
import TrackCard from "../TrackCard";

export default function Playlist({ onPlay }) {
  const { playlist, removeFromPlaylist, clearPlaylist } = usePlaylist();

  if (!playlist.length) return <div className="p-4 text-gray-400">Playlist is empty</div>;

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <h2 className="text-xl font-bold mb-2">My Playlist</h2>
      {playlist.map(track => (
        <TrackCard
          key={track.id}
          track={track}
          onPlay={onPlay}
          onRemove={() => removeFromPlaylist(track.id)}
        />
      ))}
      <button onClick={clearPlaylist} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Clear Playlist
      </button>
    </div>
  );
}
