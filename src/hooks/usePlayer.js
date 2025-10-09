// src/hooks/usePlayer.js
import { useEffect, useRef, useState } from "react";

/**
 * basic player using HTML5 Audio.
 * small, intentionally simple. We'll replace with wavesurfer later maybe.
 */
export function usePlayer() {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(30); // default preview length is 30s

  useEffect(() => {
    const a = audioRef.current;
    function onTime() { setProgress(a.currentTime); }
    function onMeta() { setDuration(a.duration || 30); }
    function onEnd() { setIsPlaying(false); }
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const load = (track) => {
    if (!track || !track.preview) {
      console.warn("no preview available for this track"); // might be common
      return;
    }
    const a = audioRef.current;
    a.src = track.preview;
    a.currentTime = 0;
    setCurrent(track);
    // note: I sometimes forget to autostart after load - intuitive UX later
  };

  const play = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("play blocked or failed", err);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());
  const seek = (t) => { audioRef.current.currentTime = t; setProgress(t); };

  return {
    audioRef,
    current,
    load,
    play,
    pause,
    toggle,
    isPlaying,
    progress,
    duration,
    seek
  };
}
