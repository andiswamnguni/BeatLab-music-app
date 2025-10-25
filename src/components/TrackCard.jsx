import React from "react";

export default function TrackCard({ track, onPlay, onAdd, onRemove, isPlaying }) {
  return (
    <div
      className={`flex items-center justify-between mb-3 p-3 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors ${
        isPlaying ? "bg-blue-900" : ""
      }`}
    >
      <div className="flex items-center">
        <img
          src={track.album.cover_small}
          alt={track.title}
          className={`w-14 h-14 mr-3 rounded transition-transform ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        />
        <div>
          <p className="font-semibold">{track.title}</p>
          <p className="text-sm text-gray-400">{track.artist.name}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {onPlay && (
          <button
            onClick={() => onPlay(track)}
            className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
          >
            Play
          </button>
        )}
        {onAdd && (
          <button
            onClick={() => onAdd(track)}
            className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
          >
            Add
          </button>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
