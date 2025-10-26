// src/App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import { usePlayer } from "./hooks/usePlayer";
import { searchTracks } from "./api/deezer";
import DJConsole from "./components/DJConsole";

export default function App() {
  // all tracks fetched from Deezer
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  // track currently playing
  const [currentTrack, setCurrentTrack] = useState(null);

  // active tab: "search" or "dj"
  const [activeTab, setActiveTab] = useState("search");

  // player instance
  const player = usePlayer();

  // search Deezer tracks
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

  // play a track
  const handlePlay = (track) => {
    if (!track) return;
    setCurrentTrack(track);
    player.load(track);
    player.play();
  };

  // add track to localStorage playlist
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
      {/* Navbar with tab switching */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* SEARCH tab */}
        {activeTab === "search" && (
          <>
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
          </>
        )}

        {/* DJ Console tab */}
        {activeTab === "dj" && (
          <DJConsole
            playlist={tracks} // using current tracks; can later use localStorage playlist
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        )}
      </main>

      {/* Player stays at the bottom */}
      <Player player={player} track={currentTrack} />
    </div>
  );
}
