import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import MapBox from "./Mapbox";
import Jobs from "../Jobs/Jobs";
import JobDetail from "../Jobs/JobDetail";
import Form from "../Jobs/Form";
import PrivateRoute from "../Common/PrivateRoute";
import Layout from "./Layout";

export default function Pages() {
  return (
    <Fragment>
      <Switch>
        <Route path="/map">
          <Layout Body={MapBox} />
        </Route>
        <PrivateRoute path="/jobs">
          <Layout Body={Jobs} />
        </PrivateRoute>
        <PrivateRoute path="/new-job">
          <Layout Body={Form} />
        </PrivateRoute>
        <PrivateRoute path={`/job/:jobid`}>
          <Layout Body={JobDetail} />
        </PrivateRoute>
      </Switch>
    </Fragment>
  );
}
