import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./moodSong.css";

const MoodSong = () => {
  const { mood } = useParams();
  const [track, setTrack] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get("/api/spotify/tracks", {
          params: { mood: decodeURIComponent(mood) },
        });
        console.log("API Response:", response.data); // Log API response
        setTrack(response.data[0]);
      } catch (err) {
        setError("Error fetching track");
      }
    };

    fetchTrack();
  }, [mood]);

  return (
    <div className="song-page">
      <h1 className="mood">{decodeURIComponent(mood)}</h1>
      {error && <p className="error">{error}</p>}
      {track ? (
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* <div className="change-mood">
        <Link to="/" className="change-mood-link">
          <p>in</p>
          <p>a</p>
          <p>different</p>
          <p>mood?</p>
        </Link>
      </div> */}
    </div>
  );
};

export default MoodSong;
