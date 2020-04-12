import {
  ADD_WORKOUT,
  MODIFY_WORKOUT,
  DELETE_WORKOUT
} from "../actions/workouts.js";

export default (workouts = [], action) => {
  switch (action.type) {
    case ADD_WORKOUT:
      return [...workouts, action.workout];

    case MODIFY_WORKOUT:
      return [
        ...workouts.slice(0, action.index),
        action.workout,
        ...workouts.slice(action.index + 1)
      ];

    case DELETE_WORKOUT:
      return [
        ...workouts.slice(0, action.index),
        ...workouts.slice(action.index + 1)
      ];
  }

  return workouts;
};
