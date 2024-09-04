import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";
import "./moodSong.css";

const MoodSong = () => {
  const { mood } = useParams();
  const [track, setTrack] = useState(null);
  const [error, setError] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;

  const fetchTrack = async () => {
    try {
      const response = await axios.get(`${apiURL}/spotify/tracks`, {
        params: { mood: decodeURIComponent(mood) },
      });
      console.log("API Response:", response.data);
      setTrack(response.data[0]);
    } catch (err) {
      setError("Error fetching track");
    }
  };

  useEffect(() => {
    init({ data });
    fetchTrack();
  }, [mood]);

  const handleRefresh = (e) => {
    e.preventDefault();
    fetchTrack();
  };

  const moodToEmoji = {
    Happy: "smile",
    Sad: "cry",
    Relaxed: "relieved",
    Energetic: "zap",
    Romantic: "heart_eyes",
    Angry: "rage",
    Focused: "brain",
    Motivated: "muscle",
    Spicy: "hot_pepper",
    Party: "mirror_ball",
    Chill: "man_in_lotus_position",
    Sleepy: "sleeping",
    Lonely: "pensive",
    Excited: "star-struck",
    Confident: "smirk",
    Mellow: "herb",
  };

  return (
    <div className="song-page">
      <h1 className="mood">
        <em-emoji
          id={moodToEmoji[decodeURIComponent(mood)]}
          size="72px"
        ></em-emoji>
      </h1>
      {error && <p className="error">{error}</p>}
      {track && track.artists ? (
        <div className="song-details">
          <h1 className="song-title">{track.name}</h1>
          <p className="song-artist">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
          <img src={track.album.images[0].url} alt={track.name} />
          {track.external_urls.spotify && (
            <iframe
              src={`https://open.spotify.com/embed/track/${track.id}`}
              width="500"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              title="Spotify Player"
            ></iframe>
          )}
          <button id="refresh" type="submit" onClick={handleRefresh}>
            Another One
            <img
              src="/dj-khaled.jpg"
              alt="DJ Khaled"
              className="dj-khaled-img"
            />
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MoodSong;
