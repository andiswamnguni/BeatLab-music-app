// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
// import { searchTracks } from "./api/deezer";
// import { usePlayer } from "./hooks/usePlayer";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Safe player stub (replace with your real usePlayer later)
  const player = {
    load: () => {},
    play: () => {},
  };

  // Safe onSearch stub (replace with real API later)
  const onSearch = async (q) => {
    console.log("Search triggered for:", q);
    alert("Search is disabled in safe mode.");
  };

  const handlePlay = (track) => {
    console.log("Play clicked:", track?.title || "N/A");
    player.load(track);
    player.play();
  };

  const handleAdd = (track) => {
    console.log("Add clicked:", track?.title || "N/A");
    const list = JSON.parse(localStorage.getItem("beatlab_playlist") || "[]");
    if (!list.find((t) => t.id === track?.id)) {
      localStorage.setItem("beatlab_playlist", JSON.stringify([...list, track]));
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <SearchBar onSearch={onSearch} />
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <TrackList tracks={tracks} onPlay={handlePlay} onAdd={handleAdd} />
        )}
      </main>
      <Player player={player} />
    </div>
  );
}
