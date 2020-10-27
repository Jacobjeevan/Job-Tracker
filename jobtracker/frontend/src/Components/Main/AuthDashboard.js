import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

export default function AuthDashboard() {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}
