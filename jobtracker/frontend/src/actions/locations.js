import axios from "axios";
import { returnErrorMessages } from "./messages";
import { GET_LOCATIONS } from "./types";
import { tokenConfig } from "./auth";

export const getLocations = () => (dispatch, getState) => {
  axios
    .get("/api/locations/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrorMessages(err.response.data, err.response.status));
    });
};
