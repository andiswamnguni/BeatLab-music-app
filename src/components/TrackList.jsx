// src/components/TrackList.jsx
import TrackCard from "./TrackCard";

export default function TrackList({ tracks = [], onPlay, onAdd }) {
  if (!tracks.length) {
    return <div className="p-4 text-center text-gray-500">No tracks yet — try searching</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
      {tracks.map((t) => (
        <TrackCard key={t.id} track={t} onPlay={onPlay} onAdd={onAdd} />
      ))}
    </div>
  );
}
