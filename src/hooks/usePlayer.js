import { useRef } from "react";

export function usePlayer() {
  const audioRef = useRef(null);

  const load = (track) => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = track.preview || ""; // dummy track URL
  };

  const play = () => {
    audioRef.current?.play();
  };

  return { load, play };
}
