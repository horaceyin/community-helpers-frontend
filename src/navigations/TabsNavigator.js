// import React, {useContext} from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../constants";
import { HomeScreen, MyJobScreen, NewJobScreen } from "../screens";
import MyActivityScreen from "../MyActivityScreen";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/AuthSlice";

const Tab = createBottomTabNavigator();

const MyTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.tabBarButtonContainer} onPress={onPress}>
    <View style={styles.tabBarButton}>{children}</View>
  </TouchableOpacity>
);

const getIconColor = (focused) => ({
  tintColor: focused ? COLORS.tabSelected : COLORS.tabNotSelected,
});

const TabsNavigator = () => {
  const isLogin = useSelector(selectIsLogin);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        // tabBarStyle: { display: "none" }, // <<<<<<<
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require("../../assets/tab-icons/home.png")}
                resizeMode="contain"
                style={[styles.tabIcon, getIconColor(focused)]}
              />
            </View>
          ),
          tabBarItemStyle: {
            height: 0,
          },
        }}
      />

      {isLogin && (
        <Tab.Screen
          name="NewJobs"
          component={NewJobScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../assets/tab-icons/plus.png")}
                resizeMode="contain"
                style={[
                  styles.plus,
                  {
                    tintColor: focused
                      ? COLORS.plusSelected
                      : COLORS.plusNotSelected,
                  },
                ]}
              />
            ),
            tabBarButton: (props) => <MyTabBarButton {...props} />,
            tabBarItemStyle: {
              height: 0,
            },
          }}
        />
      )}

      {isLogin && (
        <Tab.Screen
          name="HelpersList"
          component={MyActivityScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={require("../../assets/tab-icons/help.png")}
                  resizeMode="contain"
                  style={[styles.tabIcon, getIconColor(focused)]}
                />
              </View>
            ),
            tabBarItemStyle: {
              height: 0,
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.tabBar,
    borderTopColor: "transparent",
    position: "absolute",
    padding: 0,
    left: 16,
    right: 16,
    //bottom: 16, //can be 32
    bottom: 0, //can be 32
    height: 56,
    borderRadius: 16,
    shadowColor: COLORS.dark,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabIcon: {
    width: 32,
    height: 32,
  },
  tabIconContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 12,
  },
  tabBarButtonContainer: {
    // top: -20,
    alignItems: "center",
    justifyContent: "center", //
    shadowColor: COLORS.dark,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabBarButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.tabButton,
  },
  plus: {
    width: 32,
    height: 32,
  },
});

export default TabsNavigator;
