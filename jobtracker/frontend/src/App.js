import React, { Fragment, useState, useEffect } from "react";
import Header from "./Components/Common/Header";
import Dashboard from "./Components/Main/Dashboard";
import { loadUser } from "./Components/Auth/authAPI";
import { AppContext } from "./Components/Common/AppContext";
import "./App.css";
import { getJobs } from "./Components/Jobs/jobsAPI";
import { getLocations } from "./Components/Locations/locationsAPI";
import AuthDashboard from "./Components/Main/AuthDashboard";

const defaultUser = { user: null, token: null, isAuthenticated: false };

export default function App() {
  const [auth, setAuth] = useState(defaultUser);
  const [data, setData] = useState({ jobs: [], locations: [] });

  let { user, isAuthenticated, token } = auth;

  function storeAuth(authData) {
    let { user, token } = authData;
    localStorage.setItem("token", token);
    setAuth({ user, token, isAuthenticated: true });
  }

  function clearUser() {
    localStorage.setItem("token", null);
    setAuth(defaultUser);
  }

  useEffect(() => {
    async function getUserFromSession() {
      let foundToken = token
        ? token
        : JSON.parse(localStorage.getItem("token"));
      if (!user && foundToken) {
        let foundUser = await loadUser(foundToken);
        if (foundUser) {
          setAuth({
            user: foundUser,
            token: foundToken,
            isAuthenticated: true,
          });
        }
      }
    }

    async function getData() {
      let jobsData = await getJobs(token);
      let locationsData = await getLocations(token);
      setData({ jobs: jobsData, locations: locationsData });
    }
    getUserFromSession();
    getData();
  }, [auth, token, user]);

  return (
    <Fragment>
      <AppContext.Provider value={{ isAuthenticated, token, clearUser }}>
        <Header />
      </AppContext.Provider>
      <div className="container mt-5">
        <AppContext.Provider value={{ isAuthenticated, token, data }}>
          <Dashboard />
        </AppContext.Provider>
        <AppContext.Provider value={{ isAuthenticated, storeAuth }}>
          <AuthDashboard />
        </AppContext.Provider>
      </div>
    </Fragment>
  );
}
