import { combineReducers } from "redux";
import workouts from "./workouts.js";
import storage from "./storage.js";

export default combineReducers({
  workouts: workouts,
  storage: storage
});
