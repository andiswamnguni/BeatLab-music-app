// src/components/TrackCard.jsx
export default function TrackCard({ track, onPlay, onAdd }) {
  // small card; we'll use album.cover_small when available
  const cover = track?.album?.cover_small || "https://via.placeholder.com/64";
  return (
    <div className="flex gap-3 items-center p-3 border rounded bg-white">
      <img src={cover} alt={track.title} className="w-16 h-16 rounded object-cover" />
      <div className="flex-1">
        <div className="font-semibold">{track.title}</div>
        <div className="text-sm text-gray-500">{track.artist?.name}</div>
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={() => onPlay(track)} className="px-2 py-1 border rounded">Play</button>
        <button onClick={() => onAdd(track)} className="px-2 py-1 bg-indigo-500 text-white rounded">+</button>
      </div>
    </div>
  );
}
