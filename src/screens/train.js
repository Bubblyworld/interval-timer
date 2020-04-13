import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Traverse from "../data/traverse.js";
import * as Palette from "../palette.js";
import { FaPause, FaPlay, FaRedo, FaAngleRight } from "react-icons/fa";
import parse from "parse-duration";
import format from "format-duration";

export default function TrainScreen({ navigation, route }) {
  const workoutIndex = getWorkoutIndex(route);
  const workouts = useSelector(state => state.workouts, shallowEqual);
  const [state, setState] = useState(defaultUIState(workouts[workoutIndex]));
  useEffect(timerEffect(state, setState));

  const icons = state.isPaused
    ? [playIcon(state, setState), nextIcon(state, setState)]
    : [pauseIcon(state, setState), nextIcon(state, setState)];

  return (
    <View style={styles.container}>
      <Timer timeRemainingMs={state.timeRemainingMs} />

      <View style={styles.descWrap}>
        <Text style={styles.descText}>{state.traverse.node().description}</Text>
      </View>

      <View style={styles.iconContainer}>{icons}</View>
    </View>
  );
}

function Timer({ timeRemainingMs }) {
  const ms = (timeRemainingMs % 1000) / 100.0;

  return (
    <View style={styles.timer}>
      <Text style={styles.timerText}>{format(timeRemainingMs)}</Text>
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

function pauseIcon(state, setState) {
  return (
    <Icon
      key="pause"
      icon={FaPause}
      size={30}
      onPress={() => setState(uiState(state, setIsPaused(true)))}
    />
  );
}

function playIcon(state, setState) {
  return (
    <Icon
      key="play"
      icon={FaPlay}
      size={30}
      onPress={() => setState(uiState(state, setIsPaused(false)))}
    />
  );
}

function nextIcon(state, setState) {
  return (
    <Icon
      key="next"
      icon={FaAngleRight}
      size={50}
      onPress={() => setState(uiState(state, nextRep()))}
    />
  );
}

function timerEffect(state, setState) {
  return () => {
    if (!state.isPaused) {
      var cancelled = false;

      setTimeout(() => {
        if (cancelled) {
          return;
        }

        if (state.timeRemainingMs <= 100) {
          setState(uiState(state, nextRep()));
        } else {
          setState(uiState(state, addTimeMs(-100)));
        }
      }, 100);

      return () => {
        cancelled = true;
      };
    }
  };
}

function getWorkoutIndex(route) {
  return route.params && route.params.selectedIndex
    ? route.params.selectedIndex
    : 0;
}

function defaultUIState(workout) {
  var traverse = new Traverse(workout);

  return {
    traverse: traverse,
    isPaused: true,
    timeRemainingMs: parse(traverse.node().duration)
  };
}

const uiActions = {
  NEXT_REP: "NEXT_REP",
  ADD_TIME_MS: "DEC_TIME",
  SET_IS_PAUSED: "SET_IS_PAUSED"
};

function uiState(state, action) {
  switch (action.type) {
    case uiActions.NEXT_REP:
      var next = state.traverse.next();
      return Object.assign({}, state, {
        traverse: next,
        timeRemainingMs: parse(next.node().duration)
      });

    case uiActions.ADD_TIME_MS:
      return Object.assign({}, state, {
        timeRemainingMs: state.timeRemainingMs + action.dur
      });

    case uiActions.SET_IS_PAUSED:
      return Object.assign({}, state, {
        isPaused: action.paused
      });
  }

  return state;
}

function nextRep() {
  return { type: uiActions.NEXT_REP };
}

function addTimeMs(dur) {
  return {
    type: uiActions.ADD_TIME_MS,
    dur: dur
  };
}

function setIsPaused(paused) {
  return {
    type: uiActions.SET_IS_PAUSED,
    paused: paused
  };
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
