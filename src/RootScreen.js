import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import TabsNavigator from "./navigations/TabsNavigator";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { COLORS } from "../constants";
import { FocusedStatusBar } from "./components";
import { AppGuard } from "./features/AppGuard";

const RootScreen = () => {
  // console.log("enter RootScreen");
  return (
    // <SafeAreaView style={styles.root}>
    //   <FocusedStatusBar style='auto'/>
    //   <TabsNavigator/>
    // </SafeAreaView>
    <AppGuard>
      <View style={styles.root}>
        {/* <FocusedStatusBar style="auto" /> */}
        <TabsNavigator />
      </View>
    </AppGuard>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default RootScreen;
