import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Palette from "../palette.js";

export default function Icon({ icon, size, onPress }) {
  const ChildIcon = icon; // jsx requires capitalised names

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ChildIcon size={size} color={Palette.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10
  }
});
