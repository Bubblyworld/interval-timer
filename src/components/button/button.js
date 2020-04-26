import React from "react";
import * as Palette from "../../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Button as Btn} from '@material-ui/core';
import styles from './style';

export default function Button({ msg, onPress }) {
  return <Btn variant="contained" css={styles} color="secondary" onClick={onPress}>{msg}</Btn>;
}


