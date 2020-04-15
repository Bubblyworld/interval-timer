import {
  ADD_WORKOUT,
  MODIFY_WORKOUT,
  DELETE_WORKOUT,
  MODIFY_INTERVAL,
  MODIFY_REPEAT,
  MODIFY_NAME,
  ADD_REPEAT
} from "../actions/workouts.js";
import { RootNode } from "../../data/tree.js";
import { Workout, RepeatCol, Repeat } from "../../data/workout.js";

// TODO: Refactor this shit with lenses. Oh my god.

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

    case MODIFY_REPEAT: {
      let workout = workouts[action.workoutIndex].toWorkout();
      let col = workout.repeatCols[action.colIndex];
      let rep = col.repeats[action.repIndex];
      let newRep = new Repeat(rep.indexA, rep.indexB, action.repeats);
      let newCol = new RepeatCol([
        ...col.repeats.slice(0, action.repIndex),
        newRep,
        ...col.repeats.slice(action.repIndex + 1)
      ]);

      let newWorkout = new Workout(workout.name, workout.intervals, [
        ...workout.repeatCols.slice(0, action.colIndex),
        newCol,
        ...workout.repeatCols.slice(action.colIndex + 1)
      ]);

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
