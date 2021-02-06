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

  const getLinkContainerClass = () => {
    return "flex-1 flex space-x-5 text-center self-center space-x-24 items-stretch font-playfair italic tracking-widest";
  };

  const djangoLink = (
    <a className={getNavClasses()} href="http://jt-django.jeevan.link">
      Django Version
    </a>
  );

  const authLinks = (
    <div className={getLinkContainerClass()}>
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
    <div className={getLinkContainerClass()}>
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
    <div className="flex-initial flex flex-col space-y-10">
      <Link
        to="/"
        className="flex-1 px-20 pt-20 pb-10 text-center text-6xl hover:text-blue-600 italic font-bold font-playfair"
      >
        Job Tracker
      </Link>
      <div className="flex-1 text-center font-playfair text-2xl italic tracking-wide">
        Keep track of your job apps, the easy way.
      </div>
      {token ? authLinks : guestLinks}
    </div>
  );
}
