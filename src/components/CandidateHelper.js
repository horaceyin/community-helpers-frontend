import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  SHADOWS,
  COLORS,
  FONTS,
  SIZES,
  assets,
  SPACING,
} from "../../constants";
import { IconButton } from "./Button";
import { MD2Colors, RadioButton } from "react-native-paper";

const CandidateHelper = ({ helper, checked, handleSetChecked }) => {
  console.log("{{{{{{{{{{", helper);
  return (
    <TouchableOpacity
      onPress={() => handleSetChecked(helper.userId, helper.user.displayName)}
      disabled={helper.state === "pending" ? false : true}
    >
      <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              // backgroundColor: COLORS.primary,
            }}
          >
            <IconButton
              iconSource={
                helper.user.avatar !== "" || helper.user.avatar !== null
                  ? { uri: helper.user.avatar }
                  : assets.person04
              }
              isDisable={true}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                marginStart: SIZES.font,
                // backgroundColor: MD2Colors.amber100,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: SIZES.medium,
                  // backgroundColor: COLORS.error,
                  minWidth: "50%",
                  maxWidth: "80%",
                }}
              >
                {helper.user.displayName}
                {/* ssssssssssssssssssssssssssssssssssHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHh */}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.light,
                  // backgroundColor: COLORS.done,
                  marginTop: SPACING,
                }}
              >
                Rating:{"\t  "}
                {parseFloat(
                  helper.user.userScore / helper.user.helperCount
                ).toFixed(1)}
              </Text>

              {helper.is_taken && (
                <Text
                  style={{
                    fontFamily: FONTS.light,
                    // backgroundColor: COLORS.done,
                    marginTop: SPACING,
                  }}
                >
                  Contact:{"\t  "}
                  {helper.user.phone}
                </Text>
              )}

              {/* <View>Phone: {"  "} </View> */}
            </View>
          </View>

          {helper.state === "pending" && (
            <RadioButton
              value={helper.userId}
              innerColor={COLORS.primary}
              outerColor={COLORS.primary}
              status={checked === helper.userId ? "checked" : "unchecked"}
              // onPress={() =>
              //   handleSetChecked(helper.userId, helper.user.displayName)
              // }
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
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
