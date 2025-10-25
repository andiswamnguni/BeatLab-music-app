import React, { useRef, useEffect } from "react";

export default function Player({ track }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.preview;
      audioRef.current.play();
    }
  }, [track]);

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-md p-3 flex items-center space-x-3">
      <img src={track.album.cover_small} alt={track.title} className="w-14 h-14 rounded" />
      <div className="flex-grow">
        <p className="font-semibold">{track.title}</p>
        <p className="text-sm text-gray-400">{track.artist.name}</p>
      </div>
      <audio ref={audioRef} controls className="flex-shrink-0" />
    </div>
  );
}
