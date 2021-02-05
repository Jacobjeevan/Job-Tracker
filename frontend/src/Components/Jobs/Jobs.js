import React, { Fragment, useContext } from "react";
import { AppContext } from "../Common/AppContext";
import { deleteJob } from "./jobsAPI";
import LinkButton from "../Common/LinkButton";
import useJobs from "./useJobs";

export default function Jobs() {
  const { token } = useContext(AppContext);
  const jobs = useJobs(token);

  async function deleteThisJob(jobid) {
    await deleteJob(jobid, token);
  }

  return (
    <Fragment>
      <div className="container flex flex-wrap">
        {jobs &&
          jobs.map((job) => (
            <div
              key={job.id}
              className="m-5 border-2 rounded-md flex flex-col"
              style={{ width: "18rem" }}
            >
              <div className="flex flex-row text-center tracking-widest">
                <div className="flex-1 bg-blue-300 p-2">
                  <p>{job.employer}</p>
                </div>
                <div className="flex-1 bg-blue-300 p-2 border-l-2 border-white">
                  <p>
                    {job.city}, {job.state}
                  </p>
                </div>
              </div>
              <div className="flex-grow text-center pt-5 pb-5 bg-white">
                <h5 className="text-xl p-2">{job.title}</h5>
              </div>

              {token ? (
                <div className="flex flex-row text-center">
                  <LinkButton
                    to={`/job/${job.id}`}
                    className="flex-1 bg-green-200 p-2 hover:bg-green-400"
                  >
                    View Details
                  </LinkButton>
                  <button
                    className="flex-1 bg-red-200 p-2 hover:bg-red-400"
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
          ))}
      </div>
    </Fragment>
  );
}
