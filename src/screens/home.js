import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import * as Palette from "../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import actions from "../redux/actions";
import { LeafNode, RootNode } from "../data/tree.js";

export default function HomeScreen({ navigation }) {
  const workouts = useSelector(state => state.workouts, shallowEqual);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button
        msg="Train"
        onPress={() =>
          navigation.navigate("Select a Workout", { dest: "Train" })
        }
      />

      <Button
        msg="Create a Workout"
        onPress={() => {
          dispatch(
            actions.addWorkout(
              new RootNode("My Workout", [
                new LeafNode("12s", "An example interval.")
              ])
            )
          );
          navigation.navigate("Create a Workout", {
            selectedIndex: workouts.length
          });
        }}
      />
    </View>
  );
}

function Button({ msg, onPress }) {
  return (
    <TouchableOpacity style={styles.buttons} onPress={onPress}>
      <Text style={styles.buttonText}> {msg} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  buttons: {
    width: 200,
    height: 50,
    margin: 20,
    borderRadius: 5,
    borderColor: Palette.modify(Palette.bright, -10),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Palette.bright,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: Palette.med,
    shadowOffset: { height: 5, width: 5 }
  },

  buttonText: {
    fontSize: 18
  }
});
