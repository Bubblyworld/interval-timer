import React from 'react';
import HomeScreen from './screens/home.js';
import TrainScreen from './screens/train.js';
import CreateScreen from './screens/create.js';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Create a Workout'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Train' component={TrainScreen} />
        <Stack.Screen name='Create a Workout' component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
