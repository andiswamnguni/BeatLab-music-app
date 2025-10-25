// src/components/Player.jsx
import React from "react";

export default function Player({ player, track }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex items-center justify-between">
      <div>
        {track ? (
          <div>
            <p className="font-bold">{track.title}</p>
            <p className="text-gray-400">{track.artist}</p>
          </div>
        ) : (
          <p>Not playing</p>
        )}
      </div>
      <div>
        <button
          className="bg-green-500 px-4 py-2 rounded"
          onClick={() => player.play()}
        >
          Play
        </button>
      </div>
    </div>
  );
}
