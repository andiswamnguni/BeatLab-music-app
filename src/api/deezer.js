// src/api/deezer.js
const BASE = "https://api.deezer.com";

/**
 * Search Deezer using a proxy if provided (dev workaround for CORS).
 * returns raw json { data: [...] }
 */
export async function searchTracks(q, proxy = import.meta.env.VITE_CORS_PROXY || "") {
  const url = `${proxy}${BASE}/search?q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Deezer API error: " + res.status);
  const json = await res.json();
  return json.data || [];
}

/** fetch track details by id (not used yet) */
export async function getTrack(id, proxy = import.meta.env.VITE_CORS_PROXY || "") {
  const url = `${proxy}${BASE}/track/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Deezer API error: " + res.status);
  return res.json();
}
