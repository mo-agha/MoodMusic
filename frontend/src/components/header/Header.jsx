import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo-container">
          <img src="/Mood.png" alt="Logo" className="logo" />
        </div>
      </Link>
    </div>
  );
};

export default Header;
