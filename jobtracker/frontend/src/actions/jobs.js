import axios from "axios";
import { createMessage, returnErrorMessages } from "./messages";

import { GET_JOBS, DELETE_JOBS, ADD_JOB } from "./types";

export const getJobs = () => (dispatch) => {
  axios
    .get("/jobs/")
    .then((res) => {
      dispatch({
        type: GET_JOBS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrorMessages(err.response.data, err.response.status));
    });
};

export const deleteJob = (id) => (dispatch) => {
  axios
    .delete(`/jobs/${id}/`)
    .then((res) => {
      dispatch(createMessage({ jobDeleted: "Job Deleted" }));
      dispatch({
        type: DELETE_JOBS,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch(returnErrorMessages(err.response.data, err.response.status));
    });
};

export const addJob = (lead) => (dispatch) => {
  axios
    .post("/jobs/", lead)
    .then((res) => {
      dispatch({
        type: ADD_JOB,
        payload: res.data,
      });
      dispatch(createMessage({ jobAdded: "Job Added" }));
    })
    .catch((err) => {
      dispatch(returnErrorMessages(err.response.data, err.response.status));
    });
};
