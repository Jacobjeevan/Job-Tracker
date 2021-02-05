import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Layout from "./Layout";

export default function AuthDashboard() {
  return (
    <Switch>
      <Route path="/register">
        <Layout Body={Register} />
      </Route>
      <Route exact path="/login">
        <Layout Body={Login} />
      </Route>
    </Switch>
  );
}
