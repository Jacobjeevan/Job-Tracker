import { tokenConfig } from "../Auth/authAPI";
import useSWR from "swr";
import { axiosInstance } from "../../axios";

export async function getJobById(id, token) {
  try {
    let response = await axiosInstance.get(
      `/api/jobs/${id}/`,
      tokenConfig(token)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getJobs(token) {
  try {
    let response = await axiosInstance.get("/api/jobs/", tokenConfig(token));
    return response.data;
  } catch (error) {
    console.log(error);
  }
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
  try {
    let response = await axiosInstance.delete(
      `/api/jobs/${id}/`,
      tokenConfig(token)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addJob(job, token) {
  try {
    let response = await axiosInstance.post(
      "/api/jobs/",
      job,
      tokenConfig(token)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
