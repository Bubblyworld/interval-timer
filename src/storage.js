import AsyncStorage from "@react-native-community/async-storage";
import { workoutsToJSON, workoutsFromJSON } from "./data/serialise.js";

const storageKey = "LOCKDOWN-2020-INTERVAL-TIMER";

export function writeToStorage(state) {
  const workouts = state.workouts.map(t => t.toWorkout());
  return AsyncStorage.setItem(storageKey, workoutsToJSON(workouts));
}

export function loadFromStorage() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageKey).then(json => {
      var workouts = [];
      if (json !== null) {
        workouts = workoutsFromJSON(json);
      }

      resolve(workouts.map(w => w.toTree()));
    }, reject);
  });
}
