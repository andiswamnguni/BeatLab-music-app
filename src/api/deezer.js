// src/api/deezer.js

// Mock tracks data
const mockTracks = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: { name: "The Weeknd" },
    album: { cover_small: "https://cdns-images.dzcdn.net/images/cover/ab3c0d35b57626a7b9fcae7ef9f9c7b7/56x56-000000-80-0-0.jpg" },
    preview: "https://cdns-preview-4.dzcdn.net/stream/c-4d14b482c7e6f3efb90a0e44b92a7fe3-3.mp3",
  },
  {
    id: 2,
    title: "Levitating",
    artist: { name: "Dua Lipa" },
    album: { cover_small: "https://cdns-images.dzcdn.net/images/cover/1c243e6abfd8326c3b3c4b38b122f0f0/56x56-000000-80-0-0.jpg" },
    preview: "https://cdns-preview-2.dzcdn.net/stream/c-2567f230e7e9f8b8ab37c2f2cd6c9b73-3.mp3",
  },
  {
    id: 3,
    title: "Stay",
    artist: { name: "The Kid LAROI & Justin Bieber" },
    album: { cover_small: "https://cdns-images.dzcdn.net/images/cover/2a4b2fbd7a1c26f2e3e4c7eae8e4c6f2/56x56-000000-80-0-0.jpg" },
    preview: "https://cdns-preview-7.dzcdn.net/stream/c-7df4ab3e5d6f1d3a9f4a5b6d7e3f8a2b-3.mp3",
  },
  {
    id: 4,
    title: "Peaches",
    artist: { name: "Justin Bieber" },
    album: { cover_small: "https://cdns-images.dzcdn.net/images/cover/4c9e7f2d5c5f6d3a7b1c9e8d7f6a5c3d/56x56-000000-80-0-0.jpg" },
    preview: "https://cdns-preview-8.dzcdn.net/stream/c-8a1b2c3d4e5f6a7b8c9d0e1f2g3h4i5j-3.mp3",
  },
  {
    id: 5,
    title: "Good 4 U",
    artist: { name: "Olivia Rodrigo" },
    album: { cover_small: "https://cdns-images.dzcdn.net/images/cover/5b6c7d8e9f1a2b3c4d5e6f7a8b9c0d1e/56x56-000000-80-0-0.jpg" },
    preview: "https://cdns-preview-5.dzcdn.net/stream/c-5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d-3.mp3",
  },
  {
    id: 6,
    title: "Bad Habits",
    artist: { name: "Ed Sheeran" },
    album: { cover_small: "https://cdns-images.dzcdn.net/images/cover/6c7d8e9f1a2b3c4d5e6f7a8b9c0d1e2f/56x56-000000-80-0-0.jpg" },
    preview: "https://cdns-preview-6.dzcdn.net/stream/c-6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e-3.mp3",
  },
];

// Simulate a Deezer search
export const searchTracks = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter tracks if query matches title or artist
      const results = mockTracks.filter(
        t => t.title.toLowerCase().includes(query.toLowerCase()) ||
             t.artist.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results.length > 0 ? results : mockTracks);
    }, 500);
  });
};
