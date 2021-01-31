import React, { Fragment, useState, useEffect } from "react";
import Header from "./Components/Common/Header";
import Dashboard from "./Components/Main/Dashboard";
import { loadUser } from "./Components/Auth/authAPI";
import { AppContext } from "./Components/Common/AppContext";
import "./App.css";
import { getJobs } from "./Components/Jobs/jobsAPI";
import AuthDashboard from "./Components/Main/AuthDashboard";

const defaultUser = { user: null, token: null, isAuthenticated: false };

export default function App() {
  const [auth, setAuth] = useState(defaultUser);
  const [data, setData] = useState({ jobs: [] });

  let { user, isAuthenticated, token } = auth;

  function storeAuth(authData) {
    let { user, token } = authData;
    localStorage.setItem("token", JSON.stringify(token));
    setAuth({ user, token, isAuthenticated: true });
  }

  function clearUser() {
    localStorage.setItem("token", JSON.stringify(null));
    setAuth(defaultUser);
  }

  useEffect(() => {
    async function getUserFromSession() {
      let foundToken = token
        ? token
        : JSON.parse(localStorage.getItem("token"));
      if (!user && foundToken) {
        const APIresponse = await loadUser(foundToken);
        const { success, user, token, error } = APIresponse;
        if (success) {
          setAuth({
            user,
            token,
            isAuthenticated: true,
          });
        } else if (error) {
          console.log("Error loading user");
        }
      }
    }

    async function getData() {
      if (token) {
        const APIresponse = await getJobs(token);
        const { success, jobs, error } = APIresponse;
        if (success) {
          setData({ jobs });
        } else if (error) {
          console.log("Error loading jobs data");
        }
      }
    }
    getUserFromSession();
    getData();
  }, [auth, token, user]);

  return (
    <Fragment>
      <AppContext.Provider
        value={{ isAuthenticated, token, clearUser, storeAuth }}
      >
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
