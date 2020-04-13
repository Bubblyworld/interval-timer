import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ListScreen shows all the user's defined workouts, and when one is selected
// navigates to 'dest' with the 'selectedIndex' prop set.
export default function ListScreen({ navigation, dest }) {
  return (
    <View style={styles.container}>
      <Text>List of Things</Text>
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
