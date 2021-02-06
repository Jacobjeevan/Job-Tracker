import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import AuthDashboard from "./AuthDashboard";
import FrontPage from "./FrontPage";
import Pages from "./Pages";

export default function Dashboard() {
  return (
    <Fragment>
      <Pages />
      <AuthDashboard />
      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>
      </Switch>
    </Fragment>
  );
}
