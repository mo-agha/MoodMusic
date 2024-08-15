import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoodButtons from "./components/moodButtons/MoodButtons";
import Header from "./components/header/Header";
import "./app.css";
import MoodSong from "./components/moodSong/MoodSong";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MoodButtons />} />
          <Route path="/moodSong/:mood" element={<MoodSong />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
