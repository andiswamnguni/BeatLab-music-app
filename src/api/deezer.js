const DEEZER_API_BASE = "https://api.deezer.com";

export async function searchTracks(query) {
  try {
    const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`${DEEZER_API_BASE}/search?q=${query}`)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Deezer API error:", error);
    throw error;
  }
}

export async function getTrack(id) {
  try {
    const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`${DEEZER_API_BASE}/track/${id}`)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Deezer API error:", error);
    throw error;
  }
}

export async function getArtist(id) {
  try {
    const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`${DEEZER_API_BASE}/artist/${id}`)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Deezer API error:", error);
    throw error;
  }
}