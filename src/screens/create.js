import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Table from "../tables/table.js";
import IntervalModal from "../modals/interval_modal.js";
import * as Palette from "../palette.js";
import actions from "../redux/actions";

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

export default function CreateScreen({ navigation }) {
  const [data, setData] = useState(fakeData); // TODO(guy): put in store
  const [editRowIndex, setEditRowIndex] = useState(0);
  const [editRowVisible, setEditRowVisible] = useState(false);

  // TODO(guy): This should be a presentation component. Need a list wrapper.
  const workouts = useSelector(state => state.workouts, shallowEqual);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Table
        data={data}
        onRowPress={i => {
          setEditRowIndex(i);
          setEditRowVisible(true);
        }}
        onSetPress={() => {}}
      />

      <IntervalModal
        visible={editRowVisible}
        setVisible={setEditRowVisible}
        data={data[editRowIndex]}
        onData={datum => {
          var newData = [];
          for (var i = 0; i < data.length; i++) {
            if (i == editRowIndex) {
              newData.push(datum);
            } else {
              newData.push(data[i]);
            }
          }

          setData(newData);
        }}
        onClose={() => {
          setEditRowVisible(false);
          setEditRowIndex(0);
        }}
      />
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
  }
});
