import React, {useContext} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../SplashScreen';
import RootScreen from '../RootScreen';
import { LoginScreen, JobsDetails } from '../screens';
import { FocusedStatusBar } from '../components';
import { assets, COLORS, FONTS, SHADOWS, SIZES } from '../../constants';
import { SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { AppContext } from '../../AppContext';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../features/AuthSlice';

const Stack = createNativeStackNavigator()


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  }
}

const MainNavigator = () => {
  // const {isLoading} = useSelector(selectIsLoading);

  // if (isLoading) return (
  //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //     <ActivityIndicator size={'large'} />
  //   </View>
  // )
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        {/* <FocusedStatusBar style='auto' /> */}
        <Stack.Navigator 
          initialRouteName='Splash'
          screenOptions={{headerShown: false}}>
          <Stack.Screen 
            name='Splash' 
            component={SplashScreen}/>
          <Stack.Screen 
            name='Root' 
            component={RootScreen}/>
          <Stack.Screen 
            name='JobsDetails' 
            component={JobsDetails}/>
          <Stack.Screen 
            name='Login'
            component={LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});

export default MainNavigator