import { GET_JOB_BY_ID } from "../actions/types.js";

const initialState = {
  jobDetail: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JOB_BY_ID:
      return {
        ...state,
        jobDetail: action.payload,
      };
    default:
      return state;
  }
}
