import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}

export function MusicProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const addFavorite = (track) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === track.id);
      if (exists) return prev;
      return [...prev, { ...track, addedAt: new Date().toISOString() }];
    });
  };

  const removeFavorite = (trackId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== trackId));
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      tracks: [],
      createdAt: new Date().toISOString()
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const addToPlaylist = (playlistId, track) => {
    setPlaylists(prev =>
      prev.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: [...playlist.tracks, track] }
          : playlist
      )
    );
  };

  const removeFromPlaylist = (playlistId, trackId) => {
    setPlaylists(prev =>
      prev.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: playlist.tracks.filter(t => t.id !== trackId) }
          : playlist
      )
    );
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  };

  const addRecentSearch = (query) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      return [query, ...filtered].slice(0, 5);
    });
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    playlists,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    recentSearches,
    addRecentSearch
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}