import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { COLORS } from '../theme/theme';

const NewJobScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Job Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
  }
});

export default NewJobScreen