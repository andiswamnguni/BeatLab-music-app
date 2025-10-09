// src/App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import { searchTracks } from "./api/deezer";
import { usePlayer } from "./hooks/usePlayer";

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const player = usePlayer();

  const onSearch = async (q) => {
    setLoading(true);
    try {
      // note: may need a proxy for CORS (use VITE_CORS_PROXY in dev)
      const results = await searchTracks(q);
      // sometimes Deezer returns preview nulls; filter out if desired
      setTracks(results);
    } catch (err) {
      console.error("search failed", err);
      alert("Search failed (check network / proxy).");
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (track) => {
    // small debug leftover:
    console.log("play clicked", track.title);
    player.load(track);
    player.play();
  };

  const handleAdd = (track) => {
    const list = JSON.parse(localStorage.getItem("beatlab_playlist") || "[]");
    // naive dedupe
    if (!list.find(t => t.id === track.id)) {
      localStorage.setItem("beatlab_playlist", JSON.stringify([...list, track]));
    } else {
      // I often forget which UI to show here — quick toast later
      console.log("already in playlist");
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <SearchBar onSearch={onSearch} />
        {loading ? <div className="p-4">Loading...</div> : <TrackList tracks={tracks} onPlay={handlePlay} onAdd={handleAdd} />}
      </main>
      <Player player={player} />
    </div>
  );
}

export default App;
