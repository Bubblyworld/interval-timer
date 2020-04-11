import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        msg='Train' 
        color='#F44'
        onPress={() => navigation.navigate('Train')} />

      <Button 
        msg='Create a Workout'
        color='#4F8'
        onPress={() => navigation.navigate('Create a Workout')} />
    </View>
  );
}

function Button({ msg, color, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.buttons, { backgroundColor: color}]}
      onPress={onPress}>

      <Text style={styles.buttonText}> {msg} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#effcef',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    width: 200,
    height: 50,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 18,
  },
});
