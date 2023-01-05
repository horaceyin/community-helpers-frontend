import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES, assets } from '../../constants';
import React from 'react';

const LoginScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text style={{color: COLORS.primary}}>LoginScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.gray,
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});

export default LoginScreen