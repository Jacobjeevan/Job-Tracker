import { Form } from "./Form";
import { JobsList } from "./JobsList";

import React, { Component } from "react";

export class Job extends Component {
  render() {
    return (
      <div>
        <Form />
        <JobsList />
      </div>
    );
  }
}

export default Job;
