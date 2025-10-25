import { usePlaylist } from "../../context/PlaylistContext";

function Playlist() {
  const { playlist, removeFromPlaylist, clearPlaylist } = usePlaylist();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🎶 My Playlist</h2>

      {playlist.length === 0 ? (
        <p className="text-gray-400">No songs yet. Add some from the search!</p>
      ) : (
        <>
          <ul className="space-y-2">
            {playlist.map((song) => (
              <li
                key={song.id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
              >
                <span>{song.title} — {song.artist.name}</span>
                <button
                  onClick={() => removeFromPlaylist(song.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={clearPlaylist}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
          >
            Clear Playlist
          </button>
        </>
      )}
    </div>
  );
}

export default Playlist;
