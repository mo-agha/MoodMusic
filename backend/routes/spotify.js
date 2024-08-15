const express = require("express");
const router = express.Router();
const axios = require("axios");

// Function to get Spotify access token
const getAccessToken = async () => {
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    }
  );
  return data.access_token;
};

// Route to search tracks by mood
router.get("/tracks", async (req, res) => {
  const { mood } = req.query;

  // Map moods to seed genres or artists
  const seedGenres = getSeedGenresForMood(mood);

  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          seed_genres: seedGenres.join(","),
          limit: 1, // Number of tracks to return
        },
      }
    );
    res.json(response.data.tracks);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Error fetching recommendations" });
  }
});

const getSeedGenresForMood = (mood) => {
  // Map moods to genres or use other seeds
  const moodGenres = {
    Happy: ["pop", "dance"],
    Sad: ["sad", "acoustic"],
    Relaxed: ["chill", "ambient"],
    Energetic: ["rock", "dance"],
    Romantic: ["romance", "soft"],
    Angry: ["metal", "hardcore"],
    Focused: ["instrumental", "ambient"],
    Motivated: ["pop", "rock"],
    Nostalgic: ["classic", "retro"],
    Party: ["dance", "electronic"],
    Chill: ["chill", "lo-fi"],
    Sleepy: ["ambient", "soft"],
    Lonely: ["soul", "blues"],
    Excited: ["dance", "pop"],
    Confident: ["pop", "rock"],
    Mellow: ["acoustic", "folk"],
  };
  return moodGenres[mood] || [];
};

module.exports = router;
