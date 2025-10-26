import { useState } from "react";

const SongIDSearch = ({ onAddToPlaylist }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchSong = async () => {
    if (!query) return;

    // Mock data for demo; replace with real API call if possible
    const mockData = [
      { title: "Song A", artist: "Artist A", url: "/songs/songA.mp3" },
      { title: "Song B", artist: "Artist B", url: "/songs/songB.mp3" },
    ].filter((s) => s.title.toLowerCase().includes(query.toLowerCase()));

    setResults(mockData);
  };

  return (
    <div className="p-4 bg-gray-700 text-white rounded-lg">
      <input
        type="text"
        placeholder="Search Song ID or Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 rounded text-black w-full mb-2"
      />
      <button onClick={searchSong} className="bg-purple-600 p-2 rounded mb-2">
        Search
      </button>

      <div className="mt-2">
        {results.map((song, idx) => (
          <div key={idx} className="flex justify-between items-center mb-2">
            <div>{song.title} - {song.artist}</div>
            <button onClick={() => onAddToPlaylist(song)} className="bg-pink-500 p-1 rounded">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongIDSearch;
