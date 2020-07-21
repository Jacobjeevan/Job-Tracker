import { CREATE_MESSAGE } from "../actions/types";

const initialStatus = {};

export default function (state = initialStatus, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
