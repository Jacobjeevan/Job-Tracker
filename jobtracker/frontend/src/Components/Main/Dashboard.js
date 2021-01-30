import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import MapBox from "./Mapbox";
import Jobs from "../Jobs/Jobs";
import JobDetail from "../Jobs/JobDetail";
import Form from "../Main/Form";
import PrivateRoute from "../Common/PrivateRoute";
import FrontPage from "./FrontPage";

export default function Dashboard() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <PrivateRoute path="/map" component={MapBox} />
        <PrivateRoute path="/jobs" component={Jobs} />
        <PrivateRoute path="/new-job" component={Form} />
        <PrivateRoute path={`/job/:jobid`} component={JobDetail} />
      </Switch>
    </Fragment>
  );
}
