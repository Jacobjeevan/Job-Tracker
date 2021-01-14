import axios from "axios";
import { tokenConfig } from "../Auth/authAPI";
import useSWR from "swr";

export async function getJobById(id, token) {
  try {
    let response = await axios.get(`/api/jobs/${id}/`, tokenConfig(token));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getJobs(token) {
  try {
    let response = await axios.get("/api/jobs/", tokenConfig(token));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function useGetJobs(token) {
  const { data, error, mutate } = useSWR(
    "jobsData",
    axios.get("/api/jobs/", tokenConfig(token)).then((res) => {
      return res.data;
    })
  );

  return {
    jobs: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export async function deleteJob(id, token) {
  try {
    let response = await axios.delete(`/api/jobs/${id}/`, tokenConfig(token));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addJob(job, token) {
  try {
    let response = await axios.post("/api/jobs/", job, tokenConfig(token));
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
