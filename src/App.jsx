import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Home from "./components/Home";
import Player from "./components/Player";
import PlaylistManager from "./components/PlaylistManager";
import DJControlPanel from "./components/DJControlPanel";
import Favorites from "./components/Favorites";
import SongRecognizer from "./components/SongRecognizer";
import BottomNav from "./components/BottomNav";
import { searchTracks } from "./api/deezer";
import { usePlayer } from "./hooks/usePlayer";
import { MusicProvider } from "./store/MusicContext";

function AppContent() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const player = usePlayer();

  const onSearch = async (q) => {
    if (!q.trim()) {
      setTracks([]);
      return;
    }
    
    setLoading(true);
    try {
      const results = await searchTracks(q);
      setTracks(results || []);
    } catch (err) {
      console.error("Search failed", err);
      alert("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (track) => {
    player.load(track);
    player.play();
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-32">
      <Navbar />
      {/* Add padding-top to account for fixed navbar height */}
      <div className="pt-16 max-w-md mx-auto bg-gray-900 min-h-screen">
        <div className="p-4">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <main className="px-4">
          <Routes>
            <Route path="/" element={
              <>
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-300">Searching for music...</p>
                  </div>
                ) : tracks.length > 0 ? (
                  <Home tracks={tracks} onPlay={handlePlay} />
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-white mb-2">Welcome to BeatLab</h3>
                    <p className="text-gray-400">Search for your favorite music to get started!</p>
                  </div>
                )}
              </>
            } />
            <Route path="/song-id" element={<SongRecognizer />} />
            <Route path="/playlists" element={<PlaylistManager />} />
            <Route path="/dj" element={<DJControlPanel />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
      
      <Player player={player} />
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </Router>
  );
}

export default App;