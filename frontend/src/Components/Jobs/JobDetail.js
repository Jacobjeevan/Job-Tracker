import React, { useState, useEffect, useContext } from "react";
import { getJobById } from "./jobsAPI";
import { AppContext } from "../Common/AppContext";
import { useParams } from "react-router-dom";

export default function JobDetail() {
  const [job, setJob] = useState(null);
  const { token } = useContext(AppContext);
  let { jobid } = useParams();

  useEffect(() => {
    async function getJob() {
      const APIresponse = await getJobById(jobid, token);
      const { success, job, error } = APIresponse;
      if (success) {
        setJob(job);
      } else if (error) {
        console.log("Error loading job by id");
      }
    }
    getJob();
  }, [jobid, token]);

  return (
    <div>
      {job ? (
        <div className="container mx-10 border-2 p-5">
          <div className="flex flex-col space-y-5">
            <div className="flex-1 flex flex-row border-b border-black">
              <h2 className="flex-grow text-xl w-6/12">{job.title}</h2>
              <p className="flex-grow-0 pr-2">{job.employer}</p>
              <p className="flex-grow-0">
                {job.city}, {job.state}
              </p>
            </div>
            <p className="flex-1">{job.description}</p>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}
