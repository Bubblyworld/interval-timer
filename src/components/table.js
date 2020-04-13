import React from "react";
import { Sets, Set } from "./sets.js";
import * as Palette from "../palette.js";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Table is a generic row-based table component. Cells can either be flex- or
// absolute- sized, but complex column-based designs aren't supported.
export function Table({ children, rowHeight = 40, onRowPress }) {
  var rows = [];
  for (var i = 0; i < children.length; i++) {
    const ic = i; // bind in scope for handler lambda

    var row = React.cloneElement(children[i], {
      key: ic,
      height: rowHeight,
      isEven: i % 2 == 0,
      onPress: () => onRowPress(ic)
    });
    rows.push(row);
  }

  return <View style={styles.table}>{rows}</View>;
}

export function Row({ children, height, isEven, onPress }) {
  var cells = [];
  for (var i = 0; i < children.length; i++) {
    var cell = children[i];
    if (i != children.length - 1) {
      cell = React.cloneElement(cell, { hasRightBorder: true });
    }

    cells.push(cell);
  }

  var classes = [
    styles.row,
    { height: height },
    isEven ? styles.rowEven : styles.rowOdd
  ];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={classes}>{cells}</View>
    </TouchableOpacity>
  );
}

export function Cell({ children, hasRightBorder, absolute, flex }) {
  var classes = [styles.cell];
  if (hasRightBorder) {
    classes.push(styles.cellRightBorder);
  }
  if (absolute !== undefined) {
    classes.push({ width: absolute });
  }
  if (flex !== undefined) {
    classes.push({ flex: flex });
  }

  return <View style={classes}>{children}</View>;
}

const styles = StyleSheet.create({
  table: {
    width: "100%",
    flexDirection: "column"
  },

  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  rowEven: {
    backgroundColor: Palette.med
  },

  rowOdd: {
    backgroundColor: Palette.modify(Palette.med, 10)
  },

  cell: {
    height: "100%",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5
  },

  cellRightBorder: {
    borderRightWidth: 1,
    borderColor: Palette.med
  }
});
