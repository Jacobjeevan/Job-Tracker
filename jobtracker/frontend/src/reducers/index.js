import { combineReducers } from "redux";
import jobs from "./jobs";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  jobs,
  errors,
  messages,
});
