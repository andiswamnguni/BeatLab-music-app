import { useState } from "react";
import { useMusic } from "../store/MusicContext";

export default function SongRecognizer() {
  const [isListening, setIsListening] = useState(false);
  const [identifiedTrack, setIdentifiedTrack] = useState(null);
  const [error, setError] = useState("");
  const { addToPlaylist, createPlaylist, playlists } = useMusic();

  const startListening = async () => {
    setIsListening(true);
    setError("");
    setIdentifiedTrack(null);

    try {
      if (!navigator.mediaDevices) {
        throw new Error("Microphone access not supported");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        simulateSongRecognition();
      }, 3000);

    } catch (err) {
      setError("Microphone access denied. Please allow microphone permissions.");
      setIsListening(false);
    }
  };

  const simulateSongRecognition = () => {
    setIsListening(false);
    
    const mockTrack = {
      id: Math.random(),
      title: "Blinding Lights",
      artist: { name: "The Weeknd" },
      album: {
        title: "After Hours",
        cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/250x250-000000-80-0-0.jpg"
      },
      preview: "https://cdns-preview.dzcdn.net/stream/c-ccaee4b2b27d6d3d8ce6f7d22c3c0d9d-5.mp3"
    };
    
    setIdentifiedTrack(mockTrack);
  };

  const addToExistingPlaylist = (playlistId) => {
    if (identifiedTrack) {
      addToPlaylist(playlistId, identifiedTrack);
      alert(`"${identifiedTrack.title}" added to playlist!`);
      setIdentifiedTrack(null);
    }
  };

  const createNewPlaylistWithSong = () => {
    if (identifiedTrack) {
      const playlistName = `${identifiedTrack.title} - ${identifiedTrack.artist.name}`;
      const newPlaylist = createPlaylist(playlistName);
      addToPlaylist(newPlaylist.id, identifiedTrack);
      alert(`Created new playlist "${playlistName}" with the song!`);
      setIdentifiedTrack(null);
    }
  };

  const addToFavoritesAndClose = () => {
    if (identifiedTrack) {
      alert(`"${identifiedTrack.title}" added to your favorites!`);
      setIdentifiedTrack(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-2">Song ID</h2>
      <p className="text-gray-400 mb-6">
        Identify any song playing around you and add it directly to your playlists
      </p>
      
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        {!isListening && !identifiedTrack && (
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                 onClick={startListening}>
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-4">
              Heard a great song but don't know what it is?
            </p>
            <button
              onClick={startListening}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg"
            >
              Tap to Identify Song
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Works in taxis, parties, shops - anywhere you hear music!
            </p>
          </div>
        )}

        {isListening && (
          <div className="text-center py-8">
            <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <p className="text-red-300 font-semibold text-lg mb-2">Listening...</p>
            <p className="text-gray-400">Play the music you want to identify</p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-6 bg-red-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-8 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-4 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-7 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              <div className="w-2 h-5 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => setError("")}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {identifiedTrack && (
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 mb-6">
              <img 
                src={identifiedTrack.album.cover_medium} 
                alt={identifiedTrack.album.title}
                className="w-32 h-32 rounded-xl mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-white mb-2">{identifiedTrack.title}</h3>
              <p className="text-blue-100 text-lg mb-1">{identifiedTrack.artist.name}</p>
              <p className="text-blue-200 text-sm">Album: {identifiedTrack.album.title}</p>
            </div>
            
            <p className="text-gray-300 mb-4">Add this song to:</p>
            
            <div className="space-y-3">
              <button
                onClick={addToFavoritesAndClose}
                className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
              >
                Add to Favorites
              </button>
              
              <button
                onClick={createNewPlaylistWithSong}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Create New Playlist with This Song
              </button>

              {playlists.length > 0 && (
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-3">Or add to existing playlist:</p>
                  <div className="space-y-2">
                    {playlists.map(playlist => (
                      <button
                        key={playlist.id}
                        onClick={() => addToExistingPlaylist(playlist.id)}
                        className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        {playlist.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setIdentifiedTrack(null)}
                className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Identify Another Song
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}