import React from "react";
import Modal from "./modal.js";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/button.js";
import * as Palette from "../palette.js";

// DeleteModal asks a user if they're sure before triggering some action.
export default function DeleteModal({ visible, msg, onAccept }) {
  return (
    <Modal visible={visible} onClose={onAccept}>
      <Text style={styles.text}>{msg}</Text>
      <Button msg="I'm sure!" onPress={onAccept} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Palette.text,
    fontSize: Palette.bigFont
  }
});
