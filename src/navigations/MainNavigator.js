import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../SplashScreen";
import RootScreen from "../RootScreen";
import { FocusedStatusBar } from "../components";
import { assets, COLORS, FONTS, SHADOWS, SIZES } from "../../constants";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import {
  LoginScreen,
  JobsDetails,
  RegistrationScreen,
  InterestsScreen,
  DistrictScreen,
} from "../screens/";
import AddressDropDown from "../components/AddressDropDown";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const MainNavigator = () => {
  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer>
        {/* <FocusedStatusBar style='auto' /> */}
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Root" component={RootScreen} />
          <Stack.Screen name="JobsDetails" component={JobsDetails} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Interests" component={InterestsScreen} />
          <Stack.Screen name="District" component={DistrictScreen} />
          {/* <Stack.Screen name="Address" component={AddressDropDown} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default MainNavigator;
