// Each user has a list of their defined workouts that they can modify/create.
export const SET_WORKOUTS = "SET_WORKOUTS";
export const ADD_WORKOUT = "ADD_WORKOUT";
export const MODIFY_WORKOUT = "MODIFY_WORKOUT";
export const DELETE_WORKOUT = "DELETE_WORKOUT";
export const MODIFY_INTERVAL = "MODIFY_INTERVAL";
export const MODIFY_REPEAT = "MODIFY_REPEAT";
export const MODIFY_NAME = "MODIFY_NAME";
export const ADD_REPEAT = "ADD_REPEAT";
export const ADD_INTERVAL = "ADD_INTERVAL";
export const DELETE_INTERVAL = "DELETE_INTERVAL";
export const DELETE_REPEAT = "DELETE_REPEAT";

export function setWorkouts(workouts) {
  // only for initial state load
  return {
    type: SET_WORKOUTS,
    workouts: workouts
  };
}

export function addWorkout(workout) {
  return {
    type: ADD_WORKOUT,
    workout: workout
  };
}

export function modifyWorkout(index, workout) {
  return {
    type: MODIFY_WORKOUT,
    index: index,
    workout: workout
  };
}

export function deleteWorkout(index) {
  return {
    type: DELETE_WORKOUT,
    index: index
  };
}

export function modifyInterval(workoutIndex, intervalIndex, interval) {
  return {
    type: MODIFY_INTERVAL,
    workoutIndex: workoutIndex,
    intervalIndex: intervalIndex,
    interval: interval
  };
}

export function modifyRepeat(workoutIndex, colIndex, repIndex, repeats) {
  return {
    type: MODIFY_REPEAT,
    workoutIndex: workoutIndex,
    colIndex: colIndex,
    repIndex: repIndex,
    repeats: repeats
  };
}

export function modifyName(index, name) {
  return {
    type: MODIFY_NAME,
    index: index,
    name: name
  };
}

export function addRepeat(index, repeat) {
  return {
    type: ADD_REPEAT,
    index: index,
    repeat: repeat
  };
}

export function addInterval(index, duration, description) {
  return {
    type: ADD_INTERVAL,
    index: index,
    duration: duration,
    description: description
  };
}

export function deleteInterval(workoutIndex, intervalIndex) {
  return {
    type: DELETE_INTERVAL,
    workoutIndex: workoutIndex,
    intervalIndex: intervalIndex
  };
}

export function deleteRepeat(workoutIndex, colIndex, repIndex) {
  return {
    type: DELETE_REPEAT,
    workoutIndex: workoutIndex,
    colIndex: colIndex,
    repIndex: repIndex
  };
}
