import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [showTopics, setShowTopics] = useState(false);
  const { currentUser } = useAuth();
  const authorizedEmails = ["drewvenosa13@outlook.com", "josepholiverbiz@gmail.com"];
  const isAuthorizedUser = currentUser && authorizedEmails.includes(currentUser.email);

  const toggleTopics = () => {
    setShowTopics(!showTopics);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
      <NavLink to="/register" className="nav-link">
        Register
      </NavLink>
      <NavLink to="/news" className="nav-link">
        News
      </NavLink>
      <div className="nav-link" onClick={toggleTopics}>
        Topics
        {showTopics && (
          <div className="topics-dropdown">
            <NavLink to="/ai-for-beginners" className="dropdown-item">
              AI for Beginners
            </NavLink>
            <NavLink to="/ai-and-government" className="dropdown-item">
              AI and Government
            </NavLink>
            <NavLink to="/ai-and-business" className="dropdown-item">
              AI and Business
            </NavLink>
            <NavLink to="/ai-and-media" className="dropdown-item">
              AI and Media
            </NavLink>
          </div>
        )}
      </div>
      {isAuthorizedUser && (
        <NavLink to="/create-post" className="nav-link">
          Create Post
        </NavLink>
      )}
      {currentUser && (
        <>
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Header;