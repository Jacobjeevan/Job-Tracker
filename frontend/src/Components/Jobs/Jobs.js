import React, { Fragment, useContext } from "react";
import { AppContext } from "../Common/AppContext";
import { deleteJob } from "./jobsAPI";
import LinkButton from "../Common/LinkButton";
import "./Jobs.css";

export default function Jobs() {
  const { isAuthenticated, token, data } = useContext(AppContext);
  let { jobs } = data;

  async function deleteThisJob(jobid) {
    await deleteJob(jobid, token);
  }

  return (
    <Fragment>
      <div className="d-flex flex-wrap justify-content-flex-start">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card mb-4 mr-5 ml-5"
            style={{ width: "18rem" }}
          >
            <div className="container card-container">
              <div className="row card-info">
                <div className="col">
                  <p>{job.employer}</p>
                </div>
                <div className="col">
                  <p>
                    {job.city}, {job.state}
                  </p>
                </div>
              </div>
              <h5 className="card-title card-info">{job.title}</h5>
              {isAuthenticated ? (
                <div className="card-btn-container">
                  <LinkButton
                    to={`/job/${job.id}`}
                    className="card-btn view-btn"
                  >
                    View Details
                  </LinkButton>
                  <button
                    className="card-btn dlt-btn"
                    onClick={deleteThisJob.bind(this, job.id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <LinkButton to={`/job/${job.id}`} className="card-btn view-btn">
                  View Details
                </LinkButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
