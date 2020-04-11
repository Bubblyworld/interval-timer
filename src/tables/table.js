import React from "react";
import { Sets, Set } from "./sets.js";
import * as Palette from "../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const rowHeight = 40;

// Table renders and controls the "create a workout" page's table of intervals
// and repeats/sets. The rows and sets can be pressed to trigger the respective
// callbacks.
export default function Table({ data, onRowPress, onSetPress }) {
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    const index = i;

    rows.push(
      <Row
        index={index}
        dur={data[i][0]}
        desc={data[i][1]}
        handler={() => onRowPress(index)}
      />
    );
  }

  return (
    <View style={styles.table}>
      <View style={styles.rows}>{rows}</View>
      <Sets handler={onSetPress} />
    </View>
  );
}

function Row({ index, dur, desc, handler }) {
  var bg = Palette.med;
  if (index % 2 == 0) {
    bg = Palette.modify(Palette.med, 10);
  }

  return (
    <TouchableOpacity onPress={handler}>
      <View style={[styles.row, { backgroundColor: bg }]}>
        <View style={styles.durTextWrap}>
          <Text style={styles.durText}>{dur}</Text>
        </View>
        <Text style={styles.descText} numberOfLines={1}>
          {desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  table: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 800,
    overflow: "hidden",
    borderRadius: 5,

    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: Palette.modify(Palette.dark, 20),
    shadowOffset: { height: 5, width: 5 }
  },

  rows: {
    flex: 3,
    flexDirection: "column"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    height: rowHeight
  },

  durText: {
    width: 60,
    textAlign: "center",
    fontSize: Palette.smallFont,
    color: Palette.text
  },

  durTextWrap: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: Palette.med
  },

  descText: {
    marginLeft: 40,
    fontSize: Palette.medFont,
    color: Palette.text
  }
});
