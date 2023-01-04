import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { COLORS } from '../../constants';

const HelpersListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Helpers List Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
  }
});

export default HelpersListScreen