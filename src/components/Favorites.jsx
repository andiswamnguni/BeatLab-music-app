import { useMusic } from "../store/MusicContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useMusic();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Favorite Tracks</h2>
      <div className="grid grid-cols-2 gap-4">
        {favorites.map(track => (
          <div key={track.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <img 
              src={track.album.cover_medium || track.album.cover_small} 
              alt={track.album.title}
              className="w-full aspect-square rounded-lg mb-3"
            />
            <div className="min-h-16">
              <h3 className="font-semibold text-white text-sm truncate">{track.title}</h3>
              <p className="text-gray-300 text-xs truncate">{track.artist.name}</p>
            </div>
            <button
              onClick={() => removeFavorite(track.id)}
              className="w-full mt-2 px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      {favorites.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          No favorite tracks yet.
        </p>
      )}
    </div>
  );
}