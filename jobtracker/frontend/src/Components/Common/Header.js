import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { loadDefaultUser, logout } from "../Auth/authAPI";
import { AppContext } from "./AppContext";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, clearUser, token, storeAuth } = useContext(
    AppContext
  );

  const handleLogout = async () => {
    await logout(token);
    clearUser();
  };

  const loginTest = async () => {
    const APIresponse = await loadDefaultUser();
    const { success, user, token, error } = APIresponse;
    if (success) {
      storeAuth({ user, token });
    } else if (error) {
      console.log("Error loading default user");
    }
  };

  const authLinks = (
    <ul className="navbar-nav mt-lg-0 auth-nav">
      <Link to="/map" className="nav-link mr-4">
        Map Page
      </Link>
      <Link to="/new-job" className="nav-link mr-4">
        Add Job
      </Link>
      <Link to="/jobs" className="nav-link mr-4">
        Jobs List
      </Link>
      <Link to="/login" onClick={handleLogout} className="nav-link mr-4">
        Logout
      </Link>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav mt-lg-0 auth-nav">
      <Link to="/register" className="nav-link mr-4">
        Register
      </Link>
      <Link to="/login" className="nav-link mr-4">
        Login
      </Link>
      <button className="nav-link mr-4" onClick={async () => await loginTest()}>
        Login as Test User
      </button>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Job Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-link"
              href="http://jobtracker-django.herokuapp.com/"
            >
              Django Frontend Version
            </a>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  );
}
