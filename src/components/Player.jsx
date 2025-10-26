export default function Player({ player }) {
  const { currentTrack, isPlaying, currentTime, duration } = player;

  if (!currentTrack) return null;

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handlePlay = () => {
    player.play();
  };

  const handlePause = () => {
    player.pause();
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-gray-800 border-t border-gray-700 p-3">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <img 
            src={currentTrack.album.cover_small} 
            alt={currentTrack.album.title}
            className="w-12 h-12 rounded"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{currentTrack.title}</h3>
            <p className="text-gray-300 text-sm truncate">{currentTrack.artist.name}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {isPlaying ? (
              <button
                onClick={handlePause}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Play
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-gray-600 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}