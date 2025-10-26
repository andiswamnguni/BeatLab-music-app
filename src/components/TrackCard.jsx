// src/components/TrackCard.jsx
import React from "react";

export default function TrackCard({ track, onPlay, onAdd, onRemove, isPlaying }) {
  return (
    <div
      className={`flex flex-col items-center bg-gray-800 p-3 rounded-md hover:bg-gray-700 transition ${
        isPlaying ? "bg-blue-900" : ""
      }`}
    >
      <img
        src={track.album?.cover_medium || track.album?.cover_small || "/default-cover.png"}
        alt={track.title}
        className={`w-32 h-32 mb-2 rounded ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
      />
      <p className="font-semibold text-center">{track.title}</p>
      <p className="text-sm text-gray-400 text-center">{track.artist?.name}</p>

      <div className="flex space-x-2 mt-2">
        {onPlay && (
          <button
            onClick={() => onPlay(track)}
            className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 text-sm"
          >
            Play
          </button>
        )}
        {onAdd && (
          <button
            onClick={() => onAdd(track)}
            className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 text-sm"
          >
            Add
          </button>
        )}
        {onRemove && (
          <button
            onClick={() => onRemove(track)}
            className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-sm"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
