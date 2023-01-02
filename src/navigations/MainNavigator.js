import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../SplashScreen';
import RootScreen from '../RootScreen';


const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Splash'
        screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name='Splash' 
          component={SplashScreen}/>
        <Stack.Screen 
          name='Root' 
          component={RootScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator