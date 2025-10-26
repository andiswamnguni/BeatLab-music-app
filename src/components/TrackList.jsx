import TrackCard from "./TrackCard";

export default function TrackList({ tracks, onPlay }) {
  return (
    <>
      {tracks.map(track => (
        <TrackCard key={track.id} track={track} onPlay={onPlay} />
      ))}
    </>
  );
}