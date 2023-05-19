import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import "./header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [showTopics, setShowTopics] = useState(false);
  const { currentUser } = useAuth();
  const authorizedEmails = process.env.REACT_APP_ADMIN_EMAILS.split(",");
  const isAuthorizedUser =
    currentUser && authorizedEmails.includes(currentUser.email);

  const toggleTopics = () => {
    setShowTopics(!showTopics);
  };

  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Logo" width="50" />
      </Link>
      {!currentUser && (
        <>
          <NavLink
            to="/login"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Register
          </NavLink>
        </>
      )}
      <NavLink
        to="/news"
        className={`nav-link ${location.pathname === "/news" ? "active" : ""}`}
        activeClassName="nav-link-active"
      >
        {location.pathname === "/news" ? "News (Active)" : "News"}
      </NavLink>
      <NavLink
        to="/ai-for-beginners"
        className={`nav-link ${
          location.pathname === "/ai-for-beginners" ? "active" : ""
        }`}
        activeClassName="nav-link-active"
      >
        {location.pathname === "/ai-for-beginners"
          ? "AI for Beginners (Active)"
          : "AI for Beginners"}
      </NavLink>
      <div className="nav-link" onClick={toggleTopics}>
        AI and...
        {showTopics && (
          <div className="topics-dropdown">
            <NavLink
              to="/government"
              className="dropdown-item"
              activeClassName="nav-link-active"
            >
              Government
            </NavLink>
            <NavLink
              to="/business"
              className="dropdown-item"
              activeClassName="nav-link-active"
            >
              Business
            </NavLink>
            <NavLink
              to="/media"
              className="dropdown-item"
              activeClassName="nav-link-active"
            >
              Media
            </NavLink>
            <NavLink
        to="/ethics"
        className="dropdown-item"
        activeClassName="nav-link-active"
      >
        Ethics
      </NavLink>
      <NavLink
        to="/cybersecurity"
        className="dropdown-item"
        activeClassName="nav-link-active"
      >
        Cybersecurity
      </NavLink>
      <NavLink
        to="/healthcare"
        className="dropdown-item"
        activeClassName="nav-link-active"
      >
        Healthcare
      </NavLink>
          </div>
        )}
      </div>
      {isAuthorizedUser && (
        <NavLink
          to="/create-post"
          className="nav-link"
          activeClassName="nav-link-active"
        >
          Create Post
        </NavLink>
      )}
      {currentUser && (
        <>
          <NavLink
            to="/profile"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Profile
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Header;
