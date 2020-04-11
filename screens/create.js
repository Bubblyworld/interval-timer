import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// TODO(guy): Replace with real data.
const fakeData = [
  ['12s', '1kg small edge hang'],
  ['3m', 'rest'],
  ['2m', 'end of set rest'],
  ['5m', 'end of superset rest'],
  ['30s', '1kg pullug x 5'],
  ['3m', 'rest'],
  ['2m', 'end of set rest'],
];

export default function CreateScreen({ navigator }) {
  return (
    <View style={styles.container}>
    </View>
  );
}

// https://colorhunt.co/palette/168816

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#effcef',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tableContainer: {
    width: '100%',
    minWidth: 400,
    maxWidth: 800,
    margin: 50,
    flexDirection: 'row',
  },

  table: {
    backgroundColor: '#ccedd2',
    flex: 5,
  },

  row: {
    height: 30,
  },
  
  rowText: {
    textAlign: 'center',
  },

  setContainer: {
    flex: 3,
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: '#94d3ac',
  },
});

