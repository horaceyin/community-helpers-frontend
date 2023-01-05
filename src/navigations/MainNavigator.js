import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../SplashScreen';
import RootScreen from '../RootScreen';
import { LoginScreen } from '../screens';

const Stack = createNativeStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Splash'
        screenOptions={{headerShown: true}}>
        <Stack.Screen 
          name='Splash' 
          component={SplashScreen}/>
        <Stack.Screen 
          name='Root' 
          component={RootScreen}/>
        {/* <Stack.Screen 
          name='Details' 
          component={Details}/> */}
        <Stack.Screen 
          name='Login' 
          component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator