import React, { useState } from "react";
import * as Palette from "../palette.js";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// IntervalModal controls editing of a particular interval's time and
// description. Later on we'll implement metrics and allow them to be
// attached here as well.
export default function IntervalModal({ visible, data, onData, onClose }) {
  var containerStyles = [styles.container];
  if (!visible) {
    containerStyles.push(styles.hidden);
  }

  return (
    <View style={containerStyles}>
      <View style={styles.modal}>
        <Input
          title="Duration"
          value={data[0]}
          callback={dur => onData([dur, data[1]])}
        />
        <Input
          title="Description"
          value={data[1]}
          callback={desc => onData([data[0], desc])}
        />

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Input({ title, value, callback }) {
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
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },

  hidden: {
    display: "none"
  },

  modal: {
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: Palette.med,
    flexDirection: "col",
    alignItems: "center",
    padding: 20,
    width: "80%",
    maxWidth: 600,

    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowColor: Palette.dark,
    shadowOffset: { height: 5, width: 5 }
  },

  button: {
    width: 80,
    borderRadius: 2,
    borderColor: Palette.modify(Palette.bright, -10),
    backgroundColor: Palette.bright,
    borderWidth: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: Palette.text,
    fontSize: Palette.medFont
  },

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
