import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import MapBox from "./layout/jobs/MapBox";
import JobsList from "./layout/jobs/JobsList";
import Form from "./layout/jobs/Form";
import { Provider } from "react-redux";
import store from "../store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";
import Login from "./users/Login";
import Register from "./users/Register";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../actions/auth";
import Jobdetail from "./layout/jobs/Jobdetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container mt-5">
                <Switch>
                  <Route exact path="/" component={MapBox} />
                  <Route exact path="/jobs" component={JobsList} />
                  <PrivateRoute exact path="/new-job" component={Form} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path={`/job/:jobid`} component={Jobdetail} />
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
