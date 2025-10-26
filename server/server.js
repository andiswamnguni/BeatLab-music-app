import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

// ✅ Proxy route for Deezer trending tracks
app.get("/api/trending", async (req, res) => {
  try {
    const response = await axios.get("https://api.deezer.com/chart/0/tracks");
    res.json(response.data.data); // send only the tracks array
  } catch (err) {
    console.error("Error fetching trending tracks:", err.message);
    res.status(500).json({ error: "Failed to fetch trending tracks" });
  }
});

// ✅ Proxy route for searching tracks
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing search query" });

  try {
    const response = await axios.get(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
    );
    res.json(response.data.data);
  } catch (err) {
    console.error("Error searching tracks:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Backend server running on http://localhost:${PORT}`)
);

