import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SHADOWS, COLORS, FONTS, SIZES, assets } from "../../constants";
import { IconButton } from "./Button";
import { RadioButton } from "react-native-paper";

const CandidateHelper = ({ helper, checked, setChecked }) => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <IconButton iconSource={assets.person04} goToLogin={() => {}} />
        <Text style={{ marginStart: SIZES.font }} minWidth={"70%"}>
          {helper.user.displayName}
        </Text>
        <Text style={{ marginStart: SIZES.base }} minWidth={"70%"}>
          Rating:{" "}
          {parseFloat(helper.user.userScore / helper.user.helperCount).toFixed(
            2
          )}
        </Text>
        <RadioButton
          value={helper.userId}
          innerColor={COLORS.primary}
          outerColor={COLORS.primary}
          status={checked === helper.userId ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(helper.userId);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    margin: SIZES.base,
    // marginBottom: SIZES.base / 3,
    ...SHADOWS.dark,
    padding: SIZES.base,
  },
  card: {
    width: "100%",
    height: 100,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font,
  },
  likeButton: {},
});

export default CandidateHelper;
