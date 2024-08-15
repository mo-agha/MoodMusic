import React from "react";
import { useNavigate } from "react-router-dom";
import "./moodButtons.css";

const MoodButtons = () => {
  const navigate = useNavigate();
  const moods = [
    "Happy",
    "Sad",
    "Relaxed",
    "Energetic",
    "Romantic",
    "Angry",
    "Focused",
    "Motivated",
    "Nostalgic",
    "Party",
    "Chill",
    "Sleepy",
    "Lonely",
    "Excited",
    "Confident",
    "Mellow",
  ];

  const handleClick = (mood) => {
    console.log(`Selected Mood: ${mood}`);
    navigate(`/moodSong/${encodeURIComponent(mood)}`);
  };

  return (
    <>
      <div className="prompt">
        <span className="top-prompt">let your mood</span> <br />
        <span className="bottom-prompt">lead the melody</span>
      </div>
      <div className="mood-buttons">
        {moods.map((mood) => (
          <button key={mood} onClick={() => handleClick(mood)}>
            {mood}
          </button>
        ))}
      </div>
    </>
  );
};

export default MoodButtons;
