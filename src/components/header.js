import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo.svg"; // Import the React default logo
import "./header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [showTopics, setShowTopics] = useState(false);
  const { currentUser } = useAuth();
  const authorizedEmails = process.env.REACT_APP_ADMIN_EMAILS.split(",");
  const isAuthorizedUser = currentUser && authorizedEmails.includes(currentUser.email);

  const toggleTopics = () => {
    setShowTopics(!showTopics);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Logo" width="50" /> {/* Use the React default logo */}
      </Link>
      {!currentUser && (
        <>
          <NavLink to="/login" className="nav-link" activeClassName="nav-link-active">
            Login
          </NavLink>
          <NavLink to="/register" className="nav-link" activeClassName="nav-link-active">
            Register
          </NavLink>
        </>
      )}
      <NavLink to="/news" className="nav-link" activeClassName="nav-link-active">
        News
      </NavLink>
      <div className="nav-link" onClick={toggleTopics}>
        Topics
        {showTopics && (
          <div className="topics-dropdown">
            <NavLink to="/ai-for-beginners" className="dropdown-item" activeClassName="nav-link-active">
              AI for Beginners
            </NavLink>
            <NavLink to="/ai-and-government" className="dropdown-item" activeClassName="nav-link-active">
              AI and Government
            </NavLink>
            <NavLink to="/ai-and-business" className="dropdown-item" activeClassName="nav-link-active">
              AI and Business
            </NavLink>
            <NavLink to="/ai-and-media" className="dropdown-item" activeClassName="nav-link-active">
              AI and Media
            </NavLink>
          </div>
        )}
      </div>
      {isAuthorizedUser && (
        <NavLink to="/create-post" className="nav-link" activeClassName="nav-link-active">
          Create Post
        </NavLink>
      )}
      {currentUser && (
        <>
          <NavLink to="/profile" className="nav-link" activeClassName="nav-link-active">
            Profile
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Header;
