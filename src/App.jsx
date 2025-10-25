import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Playlist from "./components/Playlist/Playlist";
import Player from "./components/Player";
import { usePlayer } from "./hooks/usePlayer";
import { searchTracks } from "./api/deezer";
import { usePlaylist } from "./context/PlaylistContext";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [activeTab, setActiveTab] = useState("search");
  const player = usePlayer();
  const { addToPlaylist } = usePlaylist();

  const onSearch = async (q) => {
    if (!q) return;
    setLoading(true);
    try {
      const results = await searchTracks(q);
      setTracks(results);
    } catch (err) {
      console.error("Search failed:", err);
      alert("Search failed.");
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
    addToPlaylist(track);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-28">
      <Navbar />

      {/* Tabs */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setActiveTab("search")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "search" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Search
        </button>
        <button
          onClick={() => setActiveTab("playlist")}
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "playlist" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Playlist
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {activeTab === "search" && (
          <>
            <SearchBar onSearch={onSearch} />
            {loading ? (
              <div className="p-4 text-center text-gray-300">Loading...</div>
            ) : tracks.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No tracks yet — try searching</div>
            ) : (
              <TrackList tracks={tracks} onPlay={handlePlay} onAdd={handleAdd} />
            )}
          </>
        )}

        {activeTab === "playlist" && <Playlist onPlay={handlePlay} />}
      </main>

      <Player track={currentTrack} />
    </div>
  );
}
