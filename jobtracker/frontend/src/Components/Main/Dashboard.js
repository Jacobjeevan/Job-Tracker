import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import MapBox from "./Mapbox";
import Jobs from "../Jobs/Jobs";
import JobDetail from "../Jobs/JobDetail";
import Form from "../Main/Form";
import PrivateRoute from "../Common/PrivateRoute";

export default function Dashboard() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={MapBox} />
        <Route path="/jobs" component={Jobs} />
        <PrivateRoute path="/new-job" component={Form} />
        <Route path={`/job/:jobid`} component={JobDetail} />
      </Switch>
    </Fragment>
  );
}
