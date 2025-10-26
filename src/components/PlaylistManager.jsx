import { useState } from "react";
import { useMusic } from "../store/MusicContext";

export default function PlaylistManager() {
  const { playlists, createPlaylist, deletePlaylist } = useMusic();
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Your Playlists</h2>
      
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="New playlist name"
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleCreatePlaylist()}
          />
          <button
            onClick={handleCreatePlaylist}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {playlists.map(playlist => (
          <div key={playlist.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
              <button
                onClick={() => deletePlaylist(playlist.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              {playlist.tracks.length} tracks
            </p>
          </div>
        ))}
      </div>
      
      {playlists.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          No playlists yet. Create your first one!
        </p>
      )}
    </div>
  );
}