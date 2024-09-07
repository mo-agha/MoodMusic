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

// Vercel serverless function handler
export default async function handler(req, res) {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Only GET method is allowed" });
  }

  const { mood } = req.query;

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
          limit: 1,
        },
      }
    );
    res.json(response.data.tracks);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Error fetching recommendations" });
  }
}

// Function to map moods to genres
const getSeedGenresForMood = (mood) => {
  const moodGenres = {
    Happy: ["happy", "pop", "upbeat"],
    Sad: ["sad", "acoustic", "piano"],
    Relaxed: ["chill", "ambient", "downtempo"],
    Energetic: ["hard-rock", "dance-punk", "electro"],
    Romantic: ["romance", "smooth-soul", "love-songs"],
    Angry: ["heavy-metal", "hardcore-punk", "nu-metal"],
    Focused: ["minimal", "ambient-electronic", "classical"],
    Motivated: ["motivational", "anthem", "power-pop"],
    Spicy: ["latin", "neo-soul", "jazzy-grooves"],
    Party: ["club", "electro-house", "dance-anthems"],
    Chill: ["chill", "lo-fi-beats", "downtempo"],
    Sleepy: ["sleep", "relaxing-instrumentals", "soft-piano"],
    Lonely: ["blues", "melancholia", "soulful"],
    Excited: ["pop", "electronic", "dance"],
    Confident: ["swagger", "alt-rock", "indie-pop"],
    Mellow: ["folk", "acoustic", "soft"],
  };
  return moodGenres[mood] || [];
};
