// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">BeatLAB</h1>
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded bg-gray-200">Home</button>
        <button className="px-3 py-1 rounded bg-gray-200">Playlist</button>
        <button className="px-3 py-1 rounded bg-gray-200">Dj Mode</button>
        <button className="px-3 py-1 rounded bg-gray-200">TrackID</button>
      </div>
    </nav>
  );
}
