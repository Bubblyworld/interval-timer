import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Table, Row, Cell } from "../components/table.js";
import { Sets } from "../components/sets.js";
import * as Palette from "../palette.js";

// WorkoutTable renders the duration/decription table and sets markers, along
// with hooks for rendering the modals on presses.
export default function WorkoutTable({ data, onRowPress, onSetPress }) {
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    rows.push(
      <Row>
        <Cell absolute={60}>
          <View style={styles.durTextWrap}>
            <Text style={styles.durText}>{data[i][0]}</Text>
          </View>
        </Cell>

        <Cell flex={1}>
          <Text style={styles.descText}>{data[i][1]}</Text>
        </Cell>
      </Row>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Table onRowPress={onRowPress} height={40}>
          {rows}
        </Table>
      </View>

      <View style={styles.sets}>
        <Sets onSetPress={onSetPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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

  table: {
    flex: 3
  },

  sets: {
    flex: 1,
    borderLeftWidth: 2,
    borderColor: Palette.modify(Palette.med, 10),
    backgroundColor: Palette.med
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
    justifyContent: "center"
  },

  descText: {
    marginLeft: 40,
    fontSize: Palette.medFont,
    color: Palette.text
  }
});
