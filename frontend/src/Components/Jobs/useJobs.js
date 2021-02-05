import { useState, useEffect } from "react";
import { getJobs } from "./jobsAPI";

export default function useJobs(token) {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (token) {
        const APIresponse = await getJobs(token);
        const { success, jobs, error } = APIresponse;
        if (success) {
          setJobs(jobs);
        } else if (error) {
          console.log("Error loading jobs data");
        }
      }
    };
    fetchJobs();
  }, [token]);

  return jobs;
}
