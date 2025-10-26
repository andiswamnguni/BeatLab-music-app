// src/App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import { usePlayer } from "./hooks/usePlayer";
import { searchTracks, getTrendingTracks } from "./api/deezer";
import DJConsole from "./components/DJConsole";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [activeTab, setActiveTab] = useState("home"); // "home", "search", "dj"
  const player = usePlayer();

  // fetch trending tracks for Home tab
  const fetchTrending = async () => {
    setLoading(true);
    try {
      const results = await getTrendingTracks();
      setTracks(results);
    } catch (err) {
      console.error("Failed to fetch trending tracks:", err);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "home") {
      fetchTrending();
    }
  }, [activeTab]);

  // search Deezer tracks
  const onSearch = async (q) => {
    if (!q) return;
    setLoading(true);
    try {
      const results = await searchTracks(q);
      setTracks(results);
      setActiveTab("search");
    } catch (err) {
      console.error("Search failed:", err);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (track) => {
    if (!track) return;
    setCurrentTrack(track);
    player.load(track);
    player.play();
  };

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
      {/* Navbar with tab navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* HOME tab */}
        {activeTab === "home" && (
          <>
            {loading ? (
              <div className="p-4 text-center">Loading trending tracks...</div>
            ) : tracks.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No trending tracks</div>
            ) : (
              <TrackList tracks={tracks} onPlay={handlePlay} onAdd={handleAdd} />
            )}
          </>
        )}

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
            playlist={tracks}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        )}
      </main>

      {/* Global Player */}
      <Player player={player} track={currentTrack} />
    </div>
  );
}
