import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { FocusedStatusBar } from '../components';
import { COLORS, FONTS, SHADOWS, SIZES, assets } from '../../constants';
import React from 'react';

const LoginScreen = (props) => {
  return (
    <SafeAreaView style={styles.root}>
      <FocusedStatusBar style='auto' />
      <View>
        <Text style={{color: COLORS.primary}}>LoginScreen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LoginScreen