import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Table, Row, Cell } from "../components/table.js";
import { Sets } from "../components/sets.js";
import * as Palette from "../palette.js";
import Dragger from "./dragger.js";

const rowHeight = 40;
const AnimatedSets = Animated.createAnimatedComponent(Sets);

// WorkoutTable renders the duration/decription table and sets markers, along
// with hooks for rendering the modals on presses.
export default function WorkoutTable({
  intervals,
  repeatCols,
  onRowPress,
  onSetPress
}) {
  var rows = [];
  for (var i = 0; i < intervals.length; i++) {
    rows.push(
      <Row key={"row-" + i}>
        <Cell absolute={60}>
          <View style={styles.durTextWrap}>
            <Text style={styles.durText}>{intervals[i].duration}</Text>
          </View>
        </Cell>

        <Cell flex={1}>
          <Text style={styles.descText}>{intervals[i].description}</Text>
        </Cell>
      </Row>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Table height={rowHeight} onRowPress={onRowPress}>
          {rows}
        </Table>
      </View>

      <View style={styles.sets}>
        <Dragger>
          <AnimatedSets
            repeatCols={repeatCols}
            height={rowHeight}
            onSetPress={onSetPress}
            dragStart={10}
            dragEnd={10}
          />
        </Dragger>
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
