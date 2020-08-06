import axios from "axios";
import { createMessage, returnErrorMessages } from "./messages";
import { GET_JOBS, DELETE_JOBS, ADD_JOB } from "./types";
import { tokenConfig } from "./auth";

export const getJobs = () => (dispatch, getState) => {
  axios
    .get("/jobs/", tokenConfig(getState))
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

export const getJob = (id) => (dispatch, getState) => {
  axios
    .get(`/jobs/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_JOBS,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch(returnErrorMessages(err.response.data, err.response.status));
    });
};

export const deleteJob = (id) => (dispatch, getState) => {
  axios
    .delete(`/jobs/${id}/`, tokenConfig(getState))
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

export const addJob = (job) => (dispatch, getState) => {
  axios
    .post("/jobs/", job, tokenConfig(getState))
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
