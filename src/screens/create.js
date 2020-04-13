import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WorkoutTable from "../components/workout_table.js";
import IntervalModal from "../modals/interval_modal.js";
import * as Palette from "../palette.js";
import actions from "../redux/actions";
import { Workout } from "../data/workout.js";

export default function CreateScreen({ navigation, route }) {
  const [editRowIndex, setEditRowIndex] = useState(0);
  const [editRowVisible, setEditRowVisible] = useState(false);
  const workoutIndex = route.params.selectedIndex;
  const workouts = useSelector(state => state.workouts, shallowEqual);
  const workout = workouts[workoutIndex].toWorkout();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <WorkoutTable
        intervals={workout.intervals}
        repeatCols={workout.repeatCols}
        onRowPress={i => {
          setEditRowIndex(i);
          setEditRowVisible(true);
        }}
        onSetPress={() => {}}
      />

      <IntervalModal
        visible={editRowVisible}
        setVisible={setEditRowVisible}
        interval={workout.intervals[editRowIndex]}
        onChange={interval => {
          var newWorkout = Object.assign(workout, {
            intervals: [
              ...workout.intervals.slice(0, editRowIndex),
              interval,
              ...workout.intervals.slice(editRowIndex + 1)
            ]
          });

          dispatch(actions.modifyWorkout(workoutIndex, newWorkout.toTree()));
        }}
        onClose={() => {
          setEditRowVisible(false);
          setEditRowIndex(0);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});
