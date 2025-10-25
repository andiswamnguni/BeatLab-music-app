// src/hooks/usePlayer.js
import { useRef } from "react";

export function usePlayer() {
  const audioRef = useRef(null);

  const load = (track) => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = track.preview || "";
  };

  const play = () => {
    audioRef.current?.play();
  };

  const pause = () => {
    audioRef.current?.pause();
  };

  return { load, play, pause };
}
