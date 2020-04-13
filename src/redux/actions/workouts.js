// Each user has a list of their defined workouts that they can modify/create.
export const ADD_WORKOUT = "ADD_WORKOUT";
export const MODIFY_WORKOUT = "MODIFY_WORKOUT";
export const DELETE_WORKOUT = "DELETE_WORKOUT";

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
