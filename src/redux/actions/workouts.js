// Each user has a list of their defined workouts that they can modify/create.
export const ADD_WORKOUT = "ADD_WORKOUT";
export const MODIFY_WORKOUT = "MODIFY_WORKOUT";
export const DELETE_WORKOUT = "DELETE_WORKOUT";
export const MODIFY_INTERVAL = "MODIFY_INTERVAL";
export const MODIFY_REPEAT = "MODIFY_REPEAT";
export const MODIFY_NAME = "MODIFY_NAME";
export const ADD_REPEAT = "ADD_REPEAT";

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
