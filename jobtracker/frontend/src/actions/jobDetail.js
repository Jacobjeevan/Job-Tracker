import axios from "axios";
import { returnErrorMessages } from "./messages";
import { tokenConfig } from "./auth";
import { GET_JOB_BY_ID } from "./types";

export const getJob = (id) => (dispatch, getState) => {
  axios
    .get(`/api/jobs/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_JOB_BY_ID,
        payload: [res.data],
      });
    })
    .catch((err) => {
      dispatch(returnErrorMessages(err.response.data, err.response.status));
    });
};
