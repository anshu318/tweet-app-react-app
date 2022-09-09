import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../Style/Header.css";
function Header() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgotPass" ? (
        ""
      ) : (
        <nav>
          <div className="logo" aria-label="header-title">
            Tweet-App
          </div>

          <div className="navbar">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link
                  to="/home"
                  className={
                    location.pathname === "/home"
                      ? "nav-link-selected"
                      : "nav-link"
                  }
                  data-testid="home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/user-tweet"
                  className={
                    location.pathname === "/user-tweet"
                      ? "nav-link-selected"
                      : "nav-link"
                  }
                  data-testid="tweet"
                >
                  Tweet
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/users"
                  className={
                    location.pathname === "/users"
                      ? "nav-link-selected"
                      : "nav-link"
                  }
                  data-testid="user"
                >
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" data-testid="log-out">
                  LogOut
                </Link>
              </li>
            </ul>
          </div>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      )}
    </>
  );
}

export default Header;
