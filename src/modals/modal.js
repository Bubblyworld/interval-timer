import React from "react";
import * as Palette from "../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/button";

// Modal is a wrapper component that is absolutely positioned in the center
// and can be enabled/disabled by a flag. It contains a button that closes
// it by default.
export default function Modal({ children, visible, onClose }) {
  var containerStyles = [styles.container];
  if (!visible) {
    containerStyles.push(styles.hidden);
  }

  return (
    <View style={containerStyles}>
      <View style={styles.modal}>
        {children}

        <Button msg="Close" onPress={onClose} />
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
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    width: "80%",
    maxWidth: 600,

    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowColor: Palette.dark,
    shadowOffset: { height: 5, width: 5 }
  }
});
