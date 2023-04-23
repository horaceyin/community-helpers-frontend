import React, { useContext, useRef, useState } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
  useNavigationContainerRef,
} from "@react-navigation/native";
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
  MyRequestDetailScreen,
  MyJobDetailScreen,
} from "../screens/";
import MyActivityScreen from "../MyActivityScreen";
import AddressDropDown from "../components/AddressDropDown";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const theme = useTheme();

  const navigationRef = useNavigationContainerRef();

  const [currentRoute, setCurrentRoute] = useState("Splash");

  // const navigationOnReady = () => {
  //   routeNameRef.current = navigationRef.getCurrentRoute().name;
  // };

  const navigationOnStateChange = async () => {
    const currentRouteName = navigationRef.getCurrentRoute().name;
    console.log("in main on change: ", currentRouteName);
    if (currentRoute === "Splash") setCurrentRoute("Others");
  };

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor:
        currentRoute === "Splash" ? COLORS.white : theme.colors.appBar,
    },
  });

  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer
        ref={navigationRef}
        // onReady={navigationOnReady}
        onStateChange={navigationOnStateChange}
      >
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
          <Stack.Screen
            name="MyRequestDetail"
            component={MyRequestDetailScreen}
          />
          <Stack.Screen name="MyJobDetail" component={MyJobDetailScreen} />
          <Stack.Screen name="MyActivity" component={MyActivityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainNavigator;
