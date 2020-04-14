import {
  ADD_WORKOUT,
  MODIFY_WORKOUT,
  DELETE_WORKOUT,
  MODIFY_INTERVAL,
  MODIFY_NAME,
  ADD_REPEAT
} from "../actions/workouts.js";
import { RootNode } from "../../data/tree.js";
import { Workout } from "../../data/workout.js";

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

    case MODIFY_INTERVAL: {
      let workout = workouts[action.workoutIndex].toWorkout();
      let newWorkout = new Workout(
        workout.name,
        [
          ...workout.intervals.slice(0, action.intervalIndex),
          action.interval,
          ...workout.intervals.slice(action.intervalIndex + 1)
        ],
        workout.repeatCols
      );

      return [
        ...workouts.slice(0, action.workoutIndex),
        newWorkout.toTree(),
        ...workouts.slice(action.workoutIndex + 1)
      ];
    }

    case MODIFY_NAME:
      return [
        ...workouts.slice(0, action.index),
        new RootNode(action.name, workouts[action.index].children),
        ...workouts.slice(action.index + 1)
      ];

    case ADD_REPEAT: {
      let workout = workouts[action.index].toWorkout();
      workout.addRepeat(action.repeat);

      return [
        ...workouts.slice(0, action.index),
        workout.toTree(),
        ...workouts.slice(action.index + 1)
      ];
    }
  }

  return workouts;
};
