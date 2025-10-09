// src/components/Player.jsx
export default function Player({ player }) {
  if (!player) return null;
  const { current, isPlaying, toggle, progress, duration, seek } = player;

  const fmt = (s = 0) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center gap-4">
      <div className="flex items-center gap-3">
        <img src={current?.album?.cover_small || 'https://via.placeholder.com/48'} className="w-12 h-12 rounded" />
        <div>
          <div className="font-semibold">{current?.title || "Not playing"}</div>
          <div className="text-sm text-gray-500">{current?.artist?.name || ""}</div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="px-3 py-1 border rounded">{isPlaying ? "Pause" : "Play"}</button>
          <span className="text-xs">{fmt(progress)}</span>
          <input type="range" min="0" max={duration || 30} value={progress} onChange={(e)=>seek(Number(e.target.value))} className="flex-1" />
          <span className="text-xs">{fmt(duration)}</span>
        </div>
      </div>
    </div>
  );
}
