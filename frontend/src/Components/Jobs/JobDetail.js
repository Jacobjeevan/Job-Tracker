import React, { useState, useEffect, useContext } from "react";
import { getJobById } from "./jobsAPI";
import "./Jobs.css";
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
        <div className="container detail-container">
          <div className="card-detail">
            <h2>{job.title}</h2>
            <br></br>
            <p>{job.description}</p>
            <br></br>
            <p>{job.employer}</p>
            <br></br>
            <p>
              {job.city}, {job.state}
            </p>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}
