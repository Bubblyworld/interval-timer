import { Workout, Interval, RepeatCol, Repeat } from "./workout.js";

export function workoutsToJSON(workouts) {
  return JSON.stringify(workouts.map(workoutToObject));
}

export function workoutsFromJSON(json) {
  return JSON.parse(json).map(workoutFromObject);
}

export function workoutToObject(workout) {
  var json = {
    name: workout.name,
    intervals: [],
    repeatCols: []
  };

  workout.intervals.forEach(interval =>
    json.intervals.push({
      duration: interval.duration,
      description: interval.description
    })
  );

  workout.repeatCols.forEach(repeatCol => {
    var rc = [];
    repeatCol.repeats.forEach(repeat =>
      rc.push({
        indexA: repeat.indexA,
        indexB: repeat.indexB,
        repeats: repeat.repeats
      })
    );

    json.repeatCols.push(rc);
  });

  return json;
}

export function workoutFromObject(json) {
  var intervals = json.intervals.map(
    i => new Interval(i.duration, i.description)
  );

  var repeatCols = json.repeatCols.map(
    rc => new RepeatCol(rc.map(r => new Repeat(r.indexA, r.indexB, r.repeats)))
  );

  return new Workout(json.name, intervals, repeatCols);
}
