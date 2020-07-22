import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import Job from "./layout/jobs/Job";
import JobsList from "./layout/jobs/JobsList";
import { Provider } from "react-redux";
import store from "../store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";
import Login from "./users/Login";
import Register from "./users/Register";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container mt-4">
                <Switch>
                  <Route exact path="/" component={Job} />
                  <Route exact path="/jobs" component={JobsList} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
