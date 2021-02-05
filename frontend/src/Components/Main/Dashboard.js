import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import AuthDashboard from "./AuthDashboard";
import FrontPage from "./FrontPage";
import Layout from "./Layout";
import Pages from "./Pages";

export default function Dashboard() {
  return (
    <Fragment>
      <Pages />
      <AuthDashboard />
      <Switch>
        <Route exact path="/">
          <Layout Body={FrontPage} />
        </Route>
      </Switch>
    </Fragment>
  );
}
