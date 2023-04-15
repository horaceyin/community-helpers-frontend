import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SHADOWS, COLORS, SIZES, assets } from "../../constants";
import { RectButton } from "../components";
import {} from "react-native-paper";

const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ActivityScreen</Text>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
