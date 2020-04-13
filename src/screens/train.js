import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

export default function TrainScreen({ navigation, route }) {
  const workoutIndex = route.params.selectedIndex;
  const workouts = useSelector(state => state.workouts, shallowEqual);
  const workout = workouts[workoutIndex].toWorkout();

  return (
    <View style={styles.container}>
      <Text>Training Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
