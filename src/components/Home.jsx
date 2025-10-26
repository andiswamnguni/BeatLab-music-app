import TrackCard from "./TrackCard";

export default function Home({ tracks, onPlay }) {
  if (tracks.length === 0) return null;

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
      <div className="grid grid-cols-2 gap-4">
        {tracks.map(track => (
          <TrackCard key={track.id} track={track} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}