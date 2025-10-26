const BASE_URL = "http://localhost:3000";

// Fetch trending songs (from your backend)
export const getTrendingTracks = async () => {
  const res = await fetch(`${BASE_URL}/trending`);
  const data = await res.json();
  return data.data; // Deezer returns tracks inside data.data
};

// Search songs (from your backend)
export const searchTracks = async (query) => {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.data;
};
