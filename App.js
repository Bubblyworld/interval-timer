import React from "react";
import HomeScreen from "./src/screens/home.js";
import TrainScreen from "./src/screens/train.js";
import CreateScreen from "./src/screens/create.js";
import * as Palette from "./src/palette.js";
import { Modal, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Train" component={TrainScreen} />
        <Stack.Screen name="Create a Workout" component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navigatorTheme = {
  dark: false,
  colors: {
    primary: Palette.med,
    background: Palette.light,
    card: Palette.med,
    text: Palette.text,
    border: Palette.modify(Palette.dark, 30)
  }
};

// TEST remove me
import { Tree, RepeatNode, LeafNode } from "./src/data/tree.js";
import { Workout, Interval, RepeatCol, Repeat } from "./src/data/workout.js";

var il = [
  new Interval("12s", "9kg 12mm half crimp hang"),
  new Interval("3m", "rest"),
  new Interval("2m", "end of set rest"),
  new Interval("5m", "end of exercise rest"),
  new Interval("12s", "9kg 15mm open hand hang"),
  new Interval("3m", "rest"),
  new Interval("2m", "end of set rest")
];

var rcl = [
  new RepeatCol([new Repeat(0, 2, 5), new Repeat(4, 6, 5)]),
  new RepeatCol([new Repeat(0, 3, 3), new Repeat(4, 7, 3)])
];

var w = new Workout(il, rcl);
var t = w.toTree();
console.log(t);

var wp = t.toWorkout();
console.log(wp);
