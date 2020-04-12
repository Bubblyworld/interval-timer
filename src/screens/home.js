import React from "react";
import * as Palette from "../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button msg="Train" onPress={() => navigation.navigate("Train")} />

      <Button
        msg="Create a Workout"
        onPress={() => navigation.navigate("Create a Workout")}
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
