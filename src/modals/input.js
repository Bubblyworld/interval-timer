import React from "react";
import * as Palette from "../palette.js";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Input is a text field component with a title and callbacks for changes.
export default function Input({ title, value, callback }) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          value={value}
          onChangeText={txt => {
            callback(txt);
          }}
          editable={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20
  },

  input: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: Palette.modify(Palette.med, 10),
    color: Palette.text
  },

  inputText: {
    color: Palette.text,
    fontSize: Palette.medFont
  },

  titleText: {
    color: Palette.modify(Palette.med, 25),
    fontSize: Palette.smallFont,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginLeft: 10,
    marginBottom: 2
  }
});
