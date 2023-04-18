import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, FONTS } from "../../constants";
import { MyJobScreen, MyRequestsScreen } from "../screens";

const Tab = createMaterialTopTabNavigator();

const ActivityNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="My Jobs"
      screenOptions={{
        // tabBarPosition: "top",
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.body,
          height: 3,
        },
        tabBarLabelStyle: {
          fontWeight: "200",
          fontFamily: FONTS.bold,
        },
      }}
    >
      <Tab.Screen name="My Jobs" component={MyJobScreen} />
      <Tab.Screen name="My Requests" component={MyRequestsScreen} />
    </Tab.Navigator>
  );
};

export default ActivityNavigator;
