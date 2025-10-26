import { useState, useRef, useCallback } from "react";

export function usePlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  const load = useCallback((track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track.preview;
      audioRef.current.volume = volume;
      setCurrentTrack(track);
      setIsPlaying(false);
      setCurrentTime(0);
      
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
    }
  }, [volume]);

  const play = useCallback(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
    }
  }, [currentTrack]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setPlayerVolume = useCallback((newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    load,
    play,
    pause,
    seek,
    setVolume: setPlayerVolume
  };
}