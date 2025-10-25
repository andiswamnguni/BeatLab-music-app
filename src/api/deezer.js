// src/api/deezer.js
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY || "https://corsproxy.io/?";

export async function searchTracks(query) {
  if (!query) return [];

  try {
    const url = `${CORS_PROXY}https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.data) return [];

    return data.data
      .filter(track => track.preview)
      .map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title,
        preview: track.preview,
      }));
  } catch (err) {
    console.error("Deezer search failed:", err);
    return [];
  }
}
