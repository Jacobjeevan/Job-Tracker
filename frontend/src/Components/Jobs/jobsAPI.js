import { tokenConfig } from "../Auth/authAPI";
import useSWR from "swr";
import { axiosInstance } from "../../axios";

export async function getJobById(id, token) {
  let response;
  try {
    response = await axiosInstance.get(`/api/jobs/${id}/`, tokenConfig(token));
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function getJobs(token) {
  let response;
  try {
    response = await axiosInstance.get("/api/jobs/", tokenConfig(token));
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export function useGetJobs(token) {
  const { data, error, mutate } = useSWR(
    "jobsData",
    axiosInstance.get("/api/jobs/", tokenConfig(token)).then((res) => {
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
  let response;
  try {
    response = await axiosInstance.delete(
      `/api/jobs/${id}/`,
      tokenConfig(token)
    );
  } catch (error) {
    response = error.response;
  }
  return response.data;
}

export async function addJob(job, token) {
  let response;
  try {
    response = await axiosInstance.post("/api/jobs/", job, tokenConfig(token));
  } catch (error) {
    response = error.response;
  }
  return response.data;
}
