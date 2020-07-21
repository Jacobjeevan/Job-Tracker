import axios from "axios";
import { createMessage } from "./messages";

import { GET_JOBS, DELETE_JOBS, ADD_JOB, GET_ERRORS } from "./types";

export const getJobs = () => (dispatch) => {
  axios
    .get("/jobs/")
    .then((res) => {
      dispatch({
        type: GET_JOBS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
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
      const errors = {
        message: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};
