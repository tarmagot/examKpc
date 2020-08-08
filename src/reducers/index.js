import { combineReducers } from "redux";
import counterReducer from "./counter";

export default combineReducers({
  data: counterReducer,
});
