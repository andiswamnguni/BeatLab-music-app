// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import { usePlayer } from "./hooks/usePlayer";
import { searchTracks } from "./api/deezer";
import Playlist from "./components/Playlist/Playlist";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center py-6">🎧 BeatLab Music App</h1>
      {/* Your Search and Player components */}
      <Playlist />
    </div>
  );
}

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const player = usePlayer();

  // Deezer search
  const onSearch = async (q) => {
    if (!q) return;
    setLoading(true);
    try {
      const results = await searchTracks(q);
      setTracks(results);
    } catch (err) {
      console.error("Search failed:", err);
      alert("Search failed (check network or proxy).");
    } finally {
      setLoading(false);
    }
  };

  // Play a track
  const handlePlay = (track) => {
    if (!track) return;
    setCurrentTrack(track);
    player.load(track);
    player.play();
  };

  // Add track to playlist
  const handleAdd = (track) => {
    if (!track) return;
    const list = JSON.parse(localStorage.getItem("beatlab_playlist") || "[]");
    if (!list.find((t) => t.id === track.id)) {
      localStorage.setItem("beatlab_playlist", JSON.stringify([...list, track]));
      console.log("Added:", track.title);
    } else {
      console.log("Already in playlist:", track.title);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 mt-8">
        <SearchBar onSearch={onSearch} />
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : tracks.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No tracks yet — try searching
          </div>
        ) : (
          <TrackList tracks={tracks} onPlay={handlePlay} onAdd={handleAdd} />
        )}
      </main>
      <Player player={player} track={currentTrack} />
    </div>
  );
}
