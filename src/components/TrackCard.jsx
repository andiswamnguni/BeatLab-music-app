import React from "react";

export default function TrackCard({ track, onPlay, onAdd }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-3 hover:bg-gray-700 transition">
      <div>
        <p className="font-bold">{track.title}</p>
        <p className="text-gray-400">{track.artist} — {track.album}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-green-500 px-3 py-1 rounded hover:bg-green-400"
          onClick={() => onPlay(track)}
        >
          Play
        </button>
        <button
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-400"
          onClick={() => onAdd(track)}
        >
          Add
        </button>
      </div>
    </div>
  );
}
