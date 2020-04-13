import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WorkoutTable from "../components/workout_table.js";
import IntervalModal from "../modals/interval_modal.js";
import * as Palette from "../palette.js";
import actions from "../redux/actions";
import { Workout } from "../data/workout.js";
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
        onChange={interval =>
          dispatch(actions.modifyInterval(workoutIndex, editRowIndex, interval))
        }
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
  },

  nameWrap: {
    width: 200
  }
});
