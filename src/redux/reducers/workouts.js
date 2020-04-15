import {
  ADD_WORKOUT,
  MODIFY_WORKOUT,
  DELETE_WORKOUT,
  MODIFY_INTERVAL,
  MODIFY_REPEAT,
  MODIFY_NAME,
  ADD_REPEAT,
  ADD_INTERVAL,
  DELETE_INTERVAL,
  DELETE_REPEAT,
  SET_WORKOUTS
} from "../actions/workouts.js";
import { RootNode } from "../../data/tree.js";
import { Workout, Interval, RepeatCol, Repeat } from "../../data/workout.js";

// TODO: Refactor this shit with lenses. Oh my god.

export default (workouts = [], action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return action.workouts;

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

    case ADD_INTERVAL: {
      let workout = workouts[action.index].toWorkout();
      workout.intervals.push(new Interval(action.duration, action.description));

      return [
        ...workouts.slice(0, action.index),
        workout.toTree(),
        ...workouts.slice(action.index + 1)
      ];
    }

    case DELETE_INTERVAL: {
      let workout = workouts[action.workoutIndex].toWorkout();
      workout.deleteInterval(action.intervalIndex);

      return [
        ...workouts.slice(0, action.workoutIndex),
        workout.toTree(),
        ...workouts.slice(action.workoutIndex + 1)
      ];
    }

    case DELETE_REPEAT: {
      let workout = workouts[action.workoutIndex].toWorkout();
      workout.deleteRepeat(action.colIndex, action.repIndex);

      return [
        ...workouts.slice(0, action.workoutIndex),
        workout.toTree(),
        ...workouts.slice(action.workoutIndex + 1)
      ];
    }
  }

  return workouts;
};
