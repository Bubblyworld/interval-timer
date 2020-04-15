import React, { useState, useRef } from "react";
import * as Palette from "../palette.js";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const touchThreshold = 120; // to prevent presses from registering as drags

// Dragger is a wrapper component that injects drag y coords into its children
// and triggers callback when the user drags their finger or mouse over it.
// Two props are injected into its children: 'dragStart' and 'dragEnd', both
// of which are Animated.Values, so it's assumed the children are
// AnimatedComponents.
export default function Dragger({ children, onRelease }) {
  // For keeping track of drag events in the UI:
  var timestamp = 0; // fine for use in refs
  const panStart = useRef(new Animated.ValueXY()).current;
  const panDiff = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: (e, ge) => {
        const pressedMs = e.nativeEvent.timestamp - timestamp;
        if (pressedMs > touchThreshold) {
          onRelease(panStart.y._value, panStart.y._value + panDiff.y._value);
        }

        panDiff.setValue({ x: 0, y: 0 });
        panStart.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: panDiff.x, dy: panDiff.y }
      ]),
      onPanResponderGrant: (e, ge) => {
        timestamp = e.nativeEvent.timestamp;

        panStart.setValue({
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY
        });
      }
    })
  ).current;

  var injected = React.Children.map(children, child => {
    return React.cloneElement(child, {
      dragStart: panStart.y,
      dragEnd: Animated.add(panStart.y, panDiff.y)
    });
  });

  return (
    <Animated.View {...panResponder.panHandlers}>{injected}</Animated.View>
  );
}
