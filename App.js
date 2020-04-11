import React from "react";
import HomeScreen from "./src/screens/home.js";
import TrainScreen from "./src/screens/train.js";
import CreateScreen from "./src/screens/create.js";
import * as Palette from "./src/palette.js";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <Stack.Navigator initialRouteName="Create a Workout">
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
    text: Palette.dark,
    border: Palette.modify(Palette.dark, 30)
  }
};
