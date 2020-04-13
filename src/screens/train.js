import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Traverse from "../data/traverse.js";
import * as Palette from "../palette.js";
import { FaPause, FaPlay, FaRedo, FaAngleRight } from "react-icons/fa";
import parse from "parse-duration";
import format from "format-duration";

export default function TrainScreen({ navigation, route }) {
  const workoutIndex =
    route.params && route.params.selectedIndex ? route.params.selectedIndex : 0;
  const workouts = useSelector(state => state.workouts, shallowEqual);
  const [traverse, setTraverse] = useState(
    new Traverse(workouts[workoutIndex])
  );
  const [paused, setPaused] = useState(true);
  const [durationMs, setDurationMs] = useState(parse(traverse.node().duration));

  const nextRep = () => {
    var next = traverse.next();
    setDurationMs(parse(traverse.node().duration));
    setTraverse(next);
  };

  // Advance the clock if we're not paused!
  if (!paused) {
    setTimeout(() => {
      if (durationMs <= 100) {
        nextRep();
      } else {
        setDurationMs(durationMs - 100);
      }
    }, 100);
  }

  const icons = [];
  if (paused) {
    icons.push(
      <Icon
        key="play"
        icon={FaPlay}
        size={30}
        onPress={() => setPaused(false)}
      />
    );
  } else {
    icons.push(
      <Icon
        key="pause"
        icon={FaPause}
        size={30}
        onPress={() => setPaused(true)}
      />
    );
  }
  icons.push(
    <Icon key="next" icon={FaAngleRight} size={50} onPress={nextRep} />
  );

  return (
    <View style={styles.container}>
      <Timer durationMs={durationMs} />

      <View style={styles.descWrap}>
        <Text style={styles.descText}>{traverse.node().description}</Text>
      </View>

      <View style={styles.iconContainer}>{icons}</View>
    </View>
  );
}

function Timer({ durationMs }) {
  const ms = (durationMs % 1000) / 100.0;

  return (
    <View style={styles.timer}>
      <Text style={styles.timerText}>{format(durationMs)}</Text>
      <Text style={styles.msText}>{ms.toFixed(0)}</Text>
    </View>
  );
}

function Icon({ icon, size, onPress }) {
  const ChildIcon = icon; // jsx requires capitalised names

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconWrap}>
        <ChildIcon size={size} color={Palette.text} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  timer: {
    flexDirection: "column",
    width: "50%",
    height: "50%",
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: Palette.bright,
    overflow: "hidden",
    backgroundColor: Palette.dull,
    alignItems: "center",
    justifyContent: "center"
  },

  timerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Palette.text
  },

  msText: {
    fontSize: 15,
    fontWeight: "bold",
    color: Palette.text
  },

  descWrap: {
    marginTop: 40
  },

  descText: {
    fontSize: 30,
    color: Palette.text
  },

  iconContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 40
  },

  iconWrap: {
    margin: 20
  }
});
