import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { loadDefaultUser, logout } from "../Auth/authAPI";
import { AppContext } from "./AppContext";

export default function Header() {
  const { clearUser, token, storeAuth } = useContext(AppContext);

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

  const getNavClasses = () => {
    return "flex-1 hover:text-blue-600 py-1";
  };

  const djangoLink = (
    <a className={getNavClasses()} href="http://jt-django.jeevan.link">
      Django Version
    </a>
  );

  const authLinks = (
    <div className="flex space-x-5">
      {djangoLink}
      <Link to="/map" className={getNavClasses()}>
        Map Page
      </Link>
      <Link to="/new-job" className={getNavClasses()}>
        Add Job
      </Link>
      <Link to="/jobs" className={getNavClasses()}>
        Jobs List
      </Link>
      <Link to="/login" onClick={handleLogout} className={getNavClasses()}>
        Logout
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="flex space-x-5">
      {djangoLink}
      <Link to="/register" className={getNavClasses()}>
        Register
      </Link>
      <Link to="/login" className={getNavClasses()}>
        Login
      </Link>
      <div className={getNavClasses()} onClick={async () => await loginTest()}>
        Login as Test User
      </div>
    </div>
  );

  return (
    <nav className="bg-blue-200 ">
      <div className=" flex flex-col">
        <Link
          to="/"
          className="flex-1 px-20 py-20 self-center text-6xl hover:text-blue-600 italic font-bold font-playfair"
        >
          Job Tracker
        </Link>
        <div className="flex-1 bg-blue-300 p-2 text-center text-md tracking-wider">
          {token ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
}
