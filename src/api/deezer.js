// You can use a free CORS proxy during development
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY || "https://cors-anywhere.herokuapp.com/";

export async function searchTracks(query) {
  if (!query) return [];

  try {
    const res = await fetch(`${CORS_PROXY}https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    // Deezer sometimes returns null previews; filter them out
    const tracks = data.data
      .filter((track) => track.preview)
      .map((track) => ({
        id: track.id,
        title: track.title,
        preview: track.preview,
        artist: track.artist.name,
        album: track.album.title,
      }));

    return tracks;
  } catch (err) {
    console.error("Deezer search failed:", err);
    return [];
  }
}
