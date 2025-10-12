import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import Player from "./components/Player";
import { usePlayer } from "./hooks/usePlayer";
import { searchTracks } from "./api/deezer";

// Dummy track data
const dummyTracks = [
  { id: 1, title: "Track One", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Track Two", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "Track Three", preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const player = usePlayer();

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


  const handlePlay = (track) => {
    if (!track) return;
    player.load(track);
    player.play();
    console.log("Playing:", track.title);
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
    <div className="min-h-screen pb-24">
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <SearchBar onSearch={onSearch} />
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : tracks.length === 0 ? (
          <div className="p-4">No tracks yet — try searching</div>
        ) : (
          <TrackList tracks={tracks} onPlay={handlePlay} onAdd={handleAdd} />
        )}
      </main>
      <Player player={player} />
    </div>
  );
}
