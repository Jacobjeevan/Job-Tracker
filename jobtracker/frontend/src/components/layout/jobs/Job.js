import Form from "./Form";
import JobsList from "./JobsList";
import React, { Fragment } from "react";

function Job() {
  return (
    <Fragment>
      <Form />
      <JobsList />
    </Fragment>
  );
}

export default Job;
