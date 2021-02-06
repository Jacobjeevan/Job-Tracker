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
      <div className="container flex flex-wrap justify-start">
        {jobs &&
          jobs.map((job) => (
            <div
              key={job.id}
              className="m-5 rounded-md flex flex-col space-y-2"
              style={{ width: "18rem" }}
            >
              <div className="flex shadow-sm flex-row text-center tracking-widest bg-white text-sm font-playfair font-bold">
                <div className="flex-1 p-2">
                  <p>{job.employer}</p>
                </div>
                <div className="flex-1 p-2 border-l-2 border-white">
                  <p>
                    {job.city}, {job.state}
                  </p>
                </div>
              </div>
              <div className="flex-grow text-center py-10 border border-blue-300 font-playfair italic">
                <h5 className="text-xl p-2">{job.title}</h5>
              </div>

              {token ? (
                <div className="flex flex-row text-center shadow-sm bg-white font-playfair text-xs font-bold">
                  <LinkButton
                    to={`/job/${job.id}`}
                    className="flex-1 p-2 hover:bg-green-200"
                  >
                    View Details
                  </LinkButton>
                  <button
                    className="flex-1 p-2 hover:bg-red-200"
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
