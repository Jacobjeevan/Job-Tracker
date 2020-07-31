import { combineReducers } from "redux";
import jobs from "./jobs";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  jobs,
  errors,
  messages,
  auth,
});
