import * as Palette from "../../palette.js";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default  StyleSheet.create({
    button: {
      width: 120,
      height: 40,
      borderRadius: 5,
      borderColor: Palette.modify(Palette.bright, -10),
      backgroundColor: Palette.bright,
      borderWidth: 1,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center"
    },
  
    buttonText: {
      color: Palette.text,
      fontSize: Palette.bigFont
    }
  });