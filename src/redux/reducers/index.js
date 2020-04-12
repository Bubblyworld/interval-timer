import { combineReducers } from "redux";
import workouts from "./workouts.js";

export default combineReducers({
  workouts: workouts
});
