import React from "react";
import * as Palette from "../palette.js";
import { StyleSheet, Text, View } from "react-native";

const rowHeight = 40;

// TODO(guy): Replace with real data.
const fakeData = [
  ["12s", "1kg small edge hang"],
  ["3m", "rest"],
  ["2m", "end of set rest"],
  ["5m", "end of superset rest"],
  ["30s", "1kg pullug x 5"],
  ["3m", "rest"],
  ["2m", "end of set rest"]
];

export default function CreateScreen({ navigator }) {
  return (
    <View style={styles.container}>
      <Table />
    </View>
  );
}

function Table() {
  var rows = [];
  for (var i = 0; i < fakeData.length; i++) {
    rows.push(<Row index={i} dur={fakeData[i][0]} desc={fakeData[i][1]} />);
  }

  return (
    <View style={styles.table}>
      <View style={styles.rows}>{rows}</View>
      <Sets rows={fakeData.length} />
    </View>
  );
}

function Row({ index, dur, desc }) {
  var bg = Palette.med;
  if (index % 2 == 0) {
    bg = Palette.modify(Palette.med, 10);
  }

  return (
    <View style={[styles.row, { backgroundColor: bg }]}>
      <View style={styles.durTextWrap}>
        <Text style={styles.durText}>{dur}</Text>
      </View>
      <Text style={styles.descText} numberOfLines={1}>
        {desc}
      </Text>
    </View>
  );
}

function Sets({ rows }) {
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

function Set({ pairs }) {
  var children = [];
  var lastIndex = 0;
  for (var i = 0; i < pairs.length; i++) {
    if (pairs[i][0] > lastIndex) {
      const diff = pairs[i][0] - lastIndex - 1;
      children.push(<View style={{ height: rowHeight * diff }} />);
    }

    const diff = pairs[i][1] - pairs[i][0] + 1;
    children.push(<Repeat height={diff} repeats={2} />);
    lastIndex = pairs[i][1];
  }

  return <View style={styles.set}>{children}</View>;
}

function Repeat({ height, repeats }) {
  return (
    <View style={[styles.repeat, { height: rowHeight * height }]}>
      <View style={styles.repeatMarker} />
      <Text style={styles.repeatText}>{"x" + repeats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },

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
  },

  sets: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Palette.med,
    borderLeftWidth: 2,
    borderColor: Palette.modify(Palette.med, 10)
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
