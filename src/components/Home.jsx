// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import TrackList from "./TrackList";
import { searchTracks } from "../api/deezer";
import { usePlaylist } from "../context/PlaylistContext";

export default function Home({ onPlay }) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToPlaylist } = usePlaylist();

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const results = await searchTracks("top hits");
        setTrending(results.slice(0, 12)); // show 12 tracks
      } catch (err) {
        console.error("Failed to fetch trending tracks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handleAdd = (track) => {
    addToPlaylist(track);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-700 to-red-600 text-white px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to BeatLab 🎵</h1>
        <p className="text-lg text-gray-200">
          Discover, play, and create your ultimate playlist. All your favorite songs in one place!
        </p>
      </div>

      {/* Trending Tracks */}
      <h2 className="text-2xl font-semibold mb-6 text-center">Trending Tracks</h2>

      {loading ? (
        <p className="text-gray-200 text-center">Loading trending tracks...</p>
      ) : trending.length === 0 ? (
        <p className="text-gray-200 text-center">No trending tracks available</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {trending.map((track) => (
            <div
              key={track.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-200"
            >
              <img
                src={track.album?.cover_medium || track.album?.cover_small || "/default-cover.png"}
                alt={track.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-semibold truncate">{track.title}</p>
                <p className="text-xs text-gray-400 truncate">{track.artist?.name}</p>
              </div>
              <div className="flex justify-around p-2">
                <button
                  onClick={() => onPlay(track)}
                  className="px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
                >
                  Play
                </button>
                <button
                  onClick={() => handleAdd(track)}
                  className="px-2 py-1 bg-green-600 rounded text-xs hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
