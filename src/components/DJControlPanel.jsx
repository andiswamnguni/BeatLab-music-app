import { useState, useEffect } from "react";
import { useMusic } from "../store/MusicContext";
import { searchTracks } from "../api/deezer";

export default function DJControlPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deckA, setDeckA] = useState(null);
  const [deckB, setDeckB] = useState(null);
  const [activeDeck, setActiveDeck] = useState("A");
  const [bpmA, setBpmA] = useState(120);
  const [bpmB, setBpmB] = useState(120);
  const [crossfade, setCrossfade] = useState(50);

  const searchForTracks = async (query) => {
    if (!query.trim()) return;
    
    try {
      const results = await searchTracks(query);
      setSearchResults(results || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const loadToDeck = (track, deck) => {
    if (deck === "A") {
      setDeckA(track);
    } else {
      setDeckB(track);
    }
  };

  const playDeck = (deck) => {
    setActiveDeck(deck);
    alert(`Playing Deck ${deck} - ${deck === "A" ? deckA?.title : deckB?.title}`);
  };

  const stopDeck = (deck) => {
    alert(`Stopped Deck ${deck}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">DJ Console</h2>
      
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks for your mix..."
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && searchForTracks(searchQuery)}
          />
          <button
            onClick={() => searchForTracks(searchQuery)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Deck A</h3>
          {deckA ? (
            <div className="text-center">
              <img 
                src={deckA.album.cover_medium} 
                alt={deckA.album.title}
                className="w-20 h-20 rounded-lg mx-auto mb-2"
              />
              <p className="text-white text-sm font-semibold truncate">{deckA.title}</p>
              <p className="text-gray-400 text-xs truncate">{deckA.artist.name}</p>
              <div className="mt-3">
                <label className="text-gray-300 text-xs">BPM</label>
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={bpmA}
                  onChange={(e) => setBpmA(e.target.value)}
                  className="w-full"
                />
                <span className="text-blue-400 text-sm">{bpmA} BPM</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => playDeck("A")}
                  className="flex-1 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  Play
                </button>
                <button
                  onClick={() => stopDeck("A")}
                  className="flex-1 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Stop
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No track loaded</p>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Deck B</h3>
          {deckB ? (
            <div className="text-center">
              <img 
                src={deckB.album.cover_medium} 
                alt={deckB.album.title}
                className="w-20 h-20 rounded-lg mx-auto mb-2"
              />
              <p className="text-white text-sm font-semibold truncate">{deckB.title}</p>
              <p className="text-gray-400 text-xs truncate">{deckB.artist.name}</p>
              <div className="mt-3">
                <label className="text-gray-300 text-xs">BPM</label>
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={bpmB}
                  onChange={(e) => setBpmB(e.target.value)}
                  className="w-full"
                />
                <span className="text-blue-400 text-sm">{bpmB} BPM</span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => playDeck("B")}
                  className="flex-1 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  Play
                </button>
                <button
                  onClick={() => stopDeck("B")}
                  className="flex-1 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Stop
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No track loaded</p>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Crossfader</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={crossfade}
          onChange={(e) => setCrossfade(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between text-gray-300 text-sm">
          <span>Deck A</span>
          <span>Deck B</span>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Search Results</h3>
          <div className="grid grid-cols-2 gap-3">
            {searchResults.slice(0, 4).map(track => (
              <div key={track.id} className="bg-gray-700 rounded-lg p-3">
                <img 
                  src={track.album.cover_medium} 
                  alt={track.album.title}
                  className="w-full aspect-square rounded-lg mb-2"
                />
                <p className="text-white text-xs font-semibold truncate">{track.title}</p>
                <p className="text-gray-400 text-xs truncate">{track.artist.name}</p>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => loadToDeck(track, "A")}
                    className="flex-1 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Deck A
                  </button>
                  <button
                    onClick={() => loadToDeck(track, "B")}
                    className="flex-1 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                  >
                    Deck B
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-900 rounded-lg p-4 border border-blue-700 mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">DJ Connection</h3>
        <p className="text-blue-200 text-sm mb-3">
          Connect your device to CDJs or mixer via USB or network connection to play directly from BeatLab.
        </p>
        <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold">
          Connect to DJ Equipment
        </button>
      </div>
    </div>
  );
}