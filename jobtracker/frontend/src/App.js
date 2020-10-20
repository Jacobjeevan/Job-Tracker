import React, { Fragment, useState } from "react";
import Header from "./components/layout/Header";
import MapBox from "./components/layout/jobs/MapBox";
import JobsList from "./components/layout/jobs/JobsList";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth";
import { AppContext } from "./Components/Common/AppContext";
import Job from "./Components/Jobs/Job";
import Form from "./Components/Main/Form";
import { Route, Switch } from "react-router-dom";
import "./App.css";

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const isAuthenticated = () => {
    if (user) {
      return true;
    }
    return false;
  };

  function storeToken(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  useEffect(() => {
    async function getUserFromSession() {
      let foundToken = token ? token : localStorage.getItem("token");
      if (foundToken) {
        let foundUser = loadUser(foundToken);
        if (foundUser) {
          setUser(foundUser);
        }
      }
    }

    getUserFromSession();
  }, []);

  return (
    <Fragment>
      <AppContext.Provider value={{ isAuthenticated, token, setToken }}>
        <Header />
      </AppContext.Provider>
      <div className="container mt-5">
        <Switch>
          <AppContext.Provider value={{ isAuthenticated, user, token }}>
            <Route exact path="/" component={MapBox} />
            <Route exact path="/jobs" component={JobsList} />
            <PrivateRoute exact path="/new-job" component={Form} />
            <Route exact path={`/job/:jobid`} component={Job} />
          </AppContext.Provider>
          <AppContext.Provider value={{ isAuthenticated, storeToken }}>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </AppContext.Provider>
        </Switch>
      </div>
    </Fragment>
  );
}
