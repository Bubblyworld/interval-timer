import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Modal, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/home.js";
import TrainScreen from "./src/screens/train.js";
import CreateScreen from "./src/screens/create.js";
import ListScreen from "./src/screens/list.js";
import * as Palette from "./src/palette.js";
import { Tree, RepeatNode, LeafNode } from "./src/data/tree.js";
import { Workout, Interval, RepeatCol, Repeat } from "./src/data/workout.js";
import reducer from "./src/redux/reducers";
import storageMiddleware from "./src/redux/middleware.js";
import { loadFromStorage } from "./src/storage.js";
import actions from "./src/redux/actions";

const Stack = createStackNavigator();
const storageDelayMs = 1000;

const store = createStore(
  reducer,
  applyMiddleware(storageMiddleware(storageDelayMs))
);

// Load initial state.
loadFromStorage().then(
  workouts => {
    store.dispatch(actions.setWorkouts(workouts));
    store.dispatch(actions.updateStorage(0));
  },
  err => {
    alert("Failed to load data from storage: " + err);
    alert("You will NOT be able to save any workouts this session!");
  }
);

export default function App() {
  // Unfortunately gestures clash between navigation and screens, see:
  //   https://github.com/react-navigation/react-navigation/issues/2088
  const navOpts = {
    gestureEnabled: false
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={navOpts}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Train" component={TrainScreen} />
          <Stack.Screen name="Create a Workout" component={CreateScreen} />
          <Stack.Screen name="Select a Workout" component={ListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const navigationTheme = {
  dark: false,
  colors: {
    primary: Palette.med,
    background: Palette.light,
    card: Palette.med,
    text: Palette.text,
    border: Palette.modify(Palette.dark, 30)
  }
};
