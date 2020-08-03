import { combineReducers } from "redux";
import jobs from "./jobs";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import locations from "./locations";

export default combineReducers({
  jobs,
  locations,
  errors,
  messages,
  auth,
});
