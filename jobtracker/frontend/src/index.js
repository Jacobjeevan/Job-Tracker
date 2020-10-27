import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@babel/polyfill";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
