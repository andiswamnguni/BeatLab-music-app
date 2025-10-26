import { useState, useEffect } from "react";
import TrackCard from "./TrackCard";
import { searchTracks } from "../api/deezer";

export default function Home({ tracks, onPlay }) {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    const loadTrendingSongs = async () => {
      try {
        // Get trending songs by searching for popular terms
        const results = await searchTracks("popular");
        setTrendingTracks(results?.slice(0, 8) || getFallbackTracks());
      } catch (error) {
        console.error("Failed to load trending songs:", error);
        setTrendingTracks(getFallbackTracks());
      } finally {
        setLoadingTrending(false);
      }
    };

    loadTrendingSongs();
  }, []);

  const getFallbackTracks = () => {
    return [
      {
        id: 1,
        title: "Blinding Lights",
        artist: { name: "The Weeknd" },
        album: { 
          title: "After Hours",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-ccaee4b2b27d6d3d8ce6f7d22c3c0d9d-5.mp3"
      },
      {
        id: 2,
        title: "Flowers",
        artist: { name: "Miley Cyrus" },
        album: { 
          title: "Endless Summer Vacation",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/5b5c1ed5c32d66eac423c3c7c9a89c4a/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/5b5c1ed5c32d66eac423c3c7c9a89c4a/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-8d88e6f6b8eeca8b13b2a3b4c055d2e8-5.mp3"
      },
      {
        id: 3,
        title: "Dance The Night",
        artist: { name: "Dua Lipa" },
        album: { 
          title: "Barbie The Album",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/07984414c0f6b8c9d0c7e08142b8c8a5/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/07984414c0f6b8c9d0c7e08142b8c8a5/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-8c8b8e8e8e8e8e8e8e8e8e8e8e8e8e8-5.mp3"
      },
      {
        id: 4,
        title: "Seven",
        artist: { name: "Jung Kook" },
        album: { 
          title: "Seven",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c-5.mp3"
      },
      {
        id: 5,
        title: "Shape of You",
        artist: { name: "Ed Sheeran" },
        album: { 
          title: "÷ (Divide)",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/078bc5c2210f3e3c1fad11988a8e8e43/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/078bc5c2210f3e3c1fad11988a8e8e43/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-078bc5c2210f3e3c1fad11988a8e8e43-5.mp3"
      },
      {
        id: 6,
        title: "Bad Guy",
        artist: { name: "Billie Eilish" },
        album: { 
          title: "When We All Fall Asleep, Where Do We Go?",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c-5.mp3"
      },
      {
        id: 7,
        title: "Levitating",
        artist: { name: "Dua Lipa" },
        album: { 
          title: "Future Nostalgia",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c-5.mp3"
      },
      {
        id: 8,
        title: "Stay",
        artist: { name: "The Kid LAROI, Justin Bieber" },
        album: { 
          title: "F*CK LOVE 3: OVER YOU",
          cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/250x250-000000-80-0-0.jpg",
          cover_small: "https://e-cdns-images.dzcdn.net/images/cover/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c/56x56-000000-80-0-0.jpg"
        },
        preview: "https://cdns-preview.dzcdn.net/stream/c-5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c-5.mp3"
      }
    ];
  };

  // If user has searched, show search results
  if (tracks.length > 0) {
    return (
      <div className="py-4">
        <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
        <div className="grid grid-cols-2 gap-4">
          {tracks.map(track => (
            <TrackCard key={track.id} track={track} onPlay={onPlay} />
          ))}
        </div>
      </div>
    );
  }

  // Show trending songs when no search has been done
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
      
      {loadingTrending ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300">Loading trending songs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {trendingTracks.map(track => (
            <TrackCard key={track.id} track={track} onPlay={onPlay} />
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-3">Discover New Music</h3>
          <p className="text-gray-400 mb-4">
            Use the search bar above to find your favorite artists and songs
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">Pop</span>
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Hip Hop</span>
            <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm">Electronic</span>
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">Rock</span>
            <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">R&B</span>
          </div>
        </div>
      </div>
    </div>
  );
}