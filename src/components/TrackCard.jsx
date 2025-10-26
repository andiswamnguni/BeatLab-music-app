import { useState } from "react";
import { useMusic } from "../store/MusicContext";

export default function TrackCard({ track, onPlay }) {
  const { addFavorite } = useMusic();

  const handleAddFavorite = () => {
    addFavorite(track);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:bg-gray-700 transition-colors">
      <div className="relative">
        <img 
          src={track.album.cover_medium || track.album.cover_small} 
          alt={track.album.title} 
          className="w-full aspect-square rounded-lg mb-3"
        />
        <button
          onClick={handleAddFavorite}
          className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:text-red-400"
        >
          ♡
        </button>
      </div>
      
      <div className="min-h-16">
        <h3 className="font-semibold text-white text-sm truncate">{track.title}</h3>
        <p className="text-gray-300 text-xs truncate">{track.artist.name}</p>
      </div>
      
      <button
        onClick={() => onPlay(track)}
        className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
      >
        Play
      </button>
    </div>
  );
}