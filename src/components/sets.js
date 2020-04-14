import React, { useRef } from "react";
import * as Palette from "../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Sets is a component that renders the brackets on the right side of the
// "create a workout" table that indicate groups of intervals that should
// be repeated. Each "Set" is a vertical column of brackets, which are
// nested horizontally. This is a class component for animation purposes.
export class Sets extends React.Component {
  render() {
    const { repeatCols, height, onSetPress, dragStart, dragEnd } = this.props;

    var children = [];
    for (var i = 0; i < repeatCols.length; i++) {
      children.push(
        <Set key={"set-" + i} height={height} repeats={repeatCols[i].repeats} />
      );
    }

    return <View style={styles.sets}>{children}</View>;
  }
}

function Set({ height, repeats }) {
  var lastIndex = 0;
  var children = [];
  for (var i = 0; i < repeats.length; i++) {
    const repeat = repeats[i];

    if (repeat.indexA > lastIndex) {
      const diff = repeat.indexA - lastIndex;
      children.push(
        <View key={"space-" + i} style={{ height: height * diff }} />
      );
    }

    const diff = repeat.indexB - repeat.indexA;
    children.push(
      <Repeat
        key={"repeat-" + i}
        markerOffset={height / 3}
        height={diff * height}
        repeats={2}
      />
    );

    lastIndex = repeat.indexB;
  }

  // TODO: Pass in total workout table height for final space.
  return <View style={styles.set}>{children}</View>;
}

function Repeat({ height, markerOffset, repeats }) {
  return (
    <TouchableOpacity onLongPress={() => {}}>
      <View style={[styles.repeat, { height: height }]}>
        <View
          style={[
            styles.repeatMarker,
            {
              marginTop: markerOffset,
              marginBottom: markerOffset
            }
          ]}
        />
        <Text style={(styles.repeatText, { marginTop: markerOffset })}>
          {"x" + repeats}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function isDragging(dragStart, dragEnd) {
  return dragStart != 0 || dragEnd != 0;
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
    borderColor: Palette.light,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },

  repeatText: {
    marginLeft: 3,
    fontSize: Palette.smallFont,
    fontWeight: "bold",
    color: Palette.light
  }
});
