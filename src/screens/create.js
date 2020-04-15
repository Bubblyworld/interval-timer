import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WorkoutTable from "../components/workout_table.js";
import IntervalModal from "../modals/interval_modal.js";
import RepeatModal from "../modals/repeat_modal.js";
import * as Palette from "../palette.js";
import actions from "../redux/actions";
import { Workout, Repeat } from "../data/workout.js";
import Input from "../components/input.js";

export default function CreateScreen({ navigation, route }) {
  const workoutIndex = route.params.selectedIndex;
  const workoutTree = useSelector(
    state => state.workouts[workoutIndex],
    shallowEqual
  );
  const workout = workoutTree.toWorkout();
  const dispatch = useDispatch();

  // TODO: Clean up.
  const [editRowIndex, setEditRowIndex] = useState(0);
  const [editRowVisible, setEditRowVisible] = useState(false);

  const [editRepeatColIndex, setEditRepeatColIndex] = useState(0);
  const [editRepeatIndex, setEditRepeatIndex] = useState(0);
  const [editRepeatVisible, setEditRepeatVisible] = useState(false);
  const curRepeat = workout.repeatCols[editRepeatColIndex]
    ? workout.repeatCols[editRepeatColIndex].repeats[editRepeatIndex]
    : new Repeat(0, 0, 0); // edge-case for empty workouts

  return (
    <View style={styles.container}>
      <View style={styles.nameWrap}>
        <Input
          title="name"
          value={workout.name}
          callback={name => {
            dispatch(actions.modifyName(workoutIndex, name));
          }}
        />
      </View>

      <WorkoutTable
        workout={workout}
        onRowPress={i => {
          setEditRowIndex(i);
          setEditRowVisible(true);
        }}
        onSetPress={(col, i) => {
          setEditRepeatColIndex(col);
          setEditRepeatIndex(i);
          setEditRepeatVisible(true);
        }}
        onSetDrag={(startI, endI) => {
          const repeat = new Repeat(startI, endI + 1, 1);
          if (workout.isValid(repeat)) {
            dispatch(actions.addRepeat(workoutIndex, repeat));
          }
        }}
      />

      <IntervalModal
        visible={editRowVisible}
        interval={workout.intervals[editRowIndex]}
        onChange={interval =>
          dispatch(actions.modifyInterval(workoutIndex, editRowIndex, interval))
        }
        onClose={() => {
          setEditRowVisible(false);
          setEditRowIndex(0);
        }}
      />

      <RepeatModal
        visible={editRepeatVisible}
        repeat={curRepeat}
        onChange={reps => {
          dispatch(
            actions.modifyRepeat(
              workoutIndex,
              editRepeatColIndex,
              editRepeatIndex,
              reps
            )
          );
        }}
        onClose={() => {
          setEditRepeatVisible(false);
          setEditRepeatColIndex(0);
          setEditRepeatIndex(0);
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
  },

  nameWrap: {
    width: 200
  }
});
