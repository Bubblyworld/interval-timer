import React from "react";
import * as Palette from "../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const rowHeight = 40;

// Sets is a component that renders the brackets on the right side of the
// "create a workout" table that indicate groups of intervals that should
// be repeated. Each "Set" is a vertical column of brackets, which are
// nested horizontally.
export function Sets({ onSetPress }) {
  // TODO(guy): Need to pass data in correctly and wire up the callbacks.
  return (
    <View style={styles.sets}>
      <Set
        pairs={[
          [0, 1],
          [4, 5]
        ]}
      />

      <Set pairs={[[0, 2]]} />
    </View>
  );
}

export function Set({ pairs }) {
  var children = [];
  var lastIndex = 0;
  for (var i = 0; i < pairs.length; i++) {
    if (pairs[i][0] > lastIndex) {
      const diff = pairs[i][0] - lastIndex - 1;
      children.push(
        <View key={"space" + i} style={{ height: rowHeight * diff }} />
      );
    }

    const diff = pairs[i][1] - pairs[i][0] + 1;
    children.push(<Repeat key={"repeat" + i} height={diff} repeats={2} />);
    lastIndex = pairs[i][1];
  }

  return <View style={styles.set}>{children}</View>;
}

function Repeat({ height, repeats }) {
  return (
    <TouchableOpacity onLongPress={() => {}}>
      <View style={[styles.repeat, { height: rowHeight * height }]}>
        <View style={styles.repeatMarker} />
        <Text style={styles.repeatText}>{"x" + repeats}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sets: {
    flexDirection: "row"
  },

  set: {
    flexDirection: "column"
  },

  repeat: {
    flexDirection: "row"
  },

  repeatMarker: {
    width: 10,
    marginLeft: 8,
    marginTop: rowHeight / 3,
    marginBottom: rowHeight / 3,
    borderColor: Palette.light,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },

  repeatText: {
    marginLeft: 3,
    marginTop: rowHeight / 3,
    fontSize: Palette.smallFont,
    fontWeight: "bold",
    color: Palette.light
  }
});
