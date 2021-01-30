import { tokenConfig } from "../Auth/authAPI";
import useSWR from "swr";
import { axiosInstance } from "../../axios";

export function useGetLocations(token) {
  const { data, error, mutate } = useSWR(
    "locationsData",
    axiosInstance.get("/api/locations/", tokenConfig(token)).then((res) => {
      res.data;
    })
  );
  return {
    locations: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export async function getLocations(token) {
  try {
    let response = await axiosInstance.get(
      "/api/locations/",
      tokenConfig(token)
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
