import React from "react";
import * as Palette from "../palette.js";
import { StyleSheet, Text, View } from "react-native";

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
  return <View style={styles.set} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
    height: 40
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

  set: {
    flex: 1,
    backgroundColor: Palette.med,
    borderLeftWidth: 2,
    borderColor: Palette.modify(Palette.med, 10)
  }
});
