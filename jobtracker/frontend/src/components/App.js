import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import JobsList from "./layout/jobs/JobsList";
import Form from "./layout/jobs/Form";
import { Provider } from "react-redux";
import store from "../store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";

const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Header />
          <Alerts />
          <Form />
          <JobsList />
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
