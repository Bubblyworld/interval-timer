import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Table, Row, Cell } from "../components/table.js";
import * as Palette from "../palette.js";

// ListScreen shows all the user's defined workouts, and when one is selected
// navigates to 'dest' with the 'selectedIndex' prop set.
export default function ListScreen({ navigation, route }) {
  const workouts = useSelector(state => state.workouts, shallowEqual);
  const { dest = "Home" } = route.params;

  var rows = [];
  for (var i = 0; i < workouts.length; i++) {
    rows.push(
      <Row key={"row-" + i}>
        <Cell flex={1}>
          <View style={styles.nameWrap}>
            <Text style={styles.name}>{workouts[i].name}</Text>
          </View>
        </Cell>
      </Row>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableWrap}>
        <Table
          onRowPress={i => navigation.navigate(dest, { selectedIndex: i })}
          height={40}
        >
          {rows}
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  tableWrap: {
    width: "70%",
    maxWidth: 500,
    overflow: "hidden",
    borderRadius: 5,

    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: Palette.modify(Palette.dark, 20),
    shadowOffset: { height: 5, width: 5 }
  },

  nameWrap: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  name: {
    fontSize: Palette.medFont,
    color: Palette.text
  }
});
