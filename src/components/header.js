import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import "./header.css";
import { useAuth } from "../firebase/contexts/AuthContext";
import  topics  from "../pages/topics";

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
            activeclassname="nav-link-active"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="nav-link"
            activeclassname="nav-link-active"
          >
            Register
          </NavLink>
        </>
      )}
      <NavLink
        to="/news"
        className={`nav-link ${location.pathname === "/news" ? "nav-link-active" : ""}`}
      >
        News
      </NavLink>
      <NavLink
        to="/education"
        className={`nav-link ${
          location.pathname === "/ai-education" ? "nav-link-active" : ""
        }`}
      >
        Education
      </NavLink>
      <div className="dropdown-container">
        <NavLink
          to='#'
          className="nav-link"
          activeclassname="nav-link-active"
        >
          Topics
        </NavLink>
        <div className="topics-dropdown">
          {topics.map((topic) => (
            <NavLink
              key={topic.name}
              to={`/${topic.name}`}
              className="dropdown-item"
              activeclassname="nav-link-active"
            >
              {topic.title}
            </NavLink>
          ))}
        </div>
      </div>
      {isAuthorizedUser && (
        <NavLink
          to="/create-post"
          className="nav-link"
          activeclassname="nav-link-active"
        >
          Create Post
        </NavLink>
      )}
      {currentUser && (
        <>
          <NavLink
            to="/profile"
            className="nav-link"
            activeclassname="nav-link-active"
          >
            Profile
          </NavLink>
        </>
      )}
    </nav>
  );
};


export default Header;
