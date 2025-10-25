import { createContext, useContext, useState, useEffect } from "react";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("beatlab_playlist") || "[]");
    setPlaylist(saved);
  }, []);

  const addToPlaylist = (song) => {
    if (!playlist.find((item) => item.id === song.id)) {
      const newPlaylist = [...playlist, song];
      setPlaylist(newPlaylist);
      localStorage.setItem("beatlab_playlist", JSON.stringify(newPlaylist));
    }
  };

  const removeFromPlaylist = (id) => {
    const newPlaylist = playlist.filter((song) => song.id !== id);
    setPlaylist(newPlaylist);
    localStorage.setItem("beatlab_playlist", JSON.stringify(newPlaylist));
  };

  const clearPlaylist = () => {
    setPlaylist([]);
    localStorage.removeItem("beatlab_playlist");
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist, removeFromPlaylist, clearPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
