import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, FONTS } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActivityNavigator from "./navigations/ActivityNavigator";

import { selectIsLogin } from "./features/AuthSlice";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const MyActivityScreen = () => {
  const isLogin = useSelector(selectIsLogin);

  if (isLogin) {
    return (
      <View style={{ height: "100%" }}>
        <Text style={styles.pageTitle}>My Activity</Text>
        <ActivityNavigator />
      </View>
    );
  } else {
    return (
      <View style={styles.viewContainer}>
        <Text style={styles.pageTitle}>My Activity</Text>
        <Text style={styles.pageContent}>Login in to see your Activity</Text>
      </View>
    );
  }
};

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.body,
    padding: 15,
    backgroundColor: COLORS.white,
  },
  pageContent: {
    fontFamily: FONTS.bold,
    fontSize: 25,
    color: COLORS.gray,
    marginTop: 50,
    alignSelf: "center",
  },
});

export default MyActivityScreen;
