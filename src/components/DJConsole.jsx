// src/components/DJConsole.jsx
import { useState, useEffect } from "react";
import { usePlayer } from "../hooks/usePlayer";

const DJConsole = ({ playlist, currentTrack, setCurrentTrack }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  // find current track index in playlist
  const currentIndex = playlist.findIndex((t) => t.id === currentTrack?.id);

  // load track when it changes
  useEffect(() => {
    if (currentTrack) {
      player.load(currentTrack);
      if (isPlaying) player.play();
    }
  }, [currentTrack]);

  if (!currentTrack) {
    return <div className="p-4 text-gray-400">Select a track to start DJ Console</div>;
  }

  const playPause = () => {
    if (!currentTrack) return;
    if (isPlaying) player.pause();
    else player.play();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!playlist.length) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    if (!playlist.length) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1">
        <strong>{currentTrack.title}</strong> - {currentTrack.artist.name}
      </div>
      <div className="flex gap-2">
        <button
          onClick={prevTrack}
          className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700"
        >
          ⏮️
        </button>
        <button
          onClick={playPause}
          className="px-3 py-1 bg-pink-600 rounded hover:bg-pink-700"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button
          onClick={nextTrack}
          className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700"
        >
          ⏭️
        </button>
      </div>
    </div>
  );
};

export default DJConsole;
