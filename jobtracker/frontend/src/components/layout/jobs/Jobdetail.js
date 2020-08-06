import React, { Component } from "react";
import { useParams } from "react-router-dom";

export default class Jobdetail extends Component {
  render() {
    let { jobId } = useParams();

    return (
      <div>
        <h2>{jobId}</h2>
      </div>
    );
  }
}
