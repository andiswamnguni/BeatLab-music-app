import TrackCard from "./TrackCard";

export default function TrackList({ tracks, onPlay }) {
  return (
    <div className="space-y-3">
      {tracks.map(track => (
        <TrackCard key={track.id} track={track} onPlay={onPlay} />
      ))}
    </div>
  );
}