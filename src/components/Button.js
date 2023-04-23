import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, SHADOWS, SIZES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.circleButtonContainer, { ...props }]}
      onPress={handlePress}
    >
      <Image source={imgUrl} resizeMode="contain" style={styles.buttonImg} />
    </TouchableOpacity>
  );
};
//DetailsButton or RectButton template
export const RectButton = ({
  buttonText,
  minWidth,
  fontSize,
  handlePress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.RectButtonContainer,
        { minWidth: minWidth, ...props.extraContainerStyle },
        props.disabled && { ...props.RectButtonContainerDisabledStyle },
      ]}
      onPress={handlePress}
      disabled={props.disabled}
    >
      <Text
        style={[
          styles.RectButtonText,
          { fontSize: fontSize, ...props.extraTextStyle },
          props.disabled ? props.RectButtonTextDisabled : null,
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

//LikeDislikeButton
export const LikeDislikeButton = ({
  buttonText,
  minWidth,
  fontSize,
  isLikePress,
  isDislikePress,
  handleLikePress,
  handleDislikePress,
  ...props
}) => {
  return (
    <View
      style={[
        styles.likeDislikeButtonContainer,
        { minWidth: minWidth, ...props },
      ]}
    >
      <TouchableOpacity onPress={handleLikePress}>
        <AntDesign
          style={styles.likeDislikeButtonText}
          name={isLikePress ? "like1" : "like2"}
          size={SIZES.extraLarge}
          color={COLORS.gray}
        />
      </TouchableOpacity>
      <Text style={styles.likeDislikeButtonSeparator}>|</Text>
      <TouchableOpacity onPress={handleDislikePress}>
        <AntDesign
          style={styles.likeDislikeButtonText}
          name={isDislikePress ? "dislike1" : "dislike2"}
          size={SIZES.extraLarge}
          color={COLORS.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

export const IconButton = ({ iconSource, goToLogin, isDisable = false }) => {
  return (
    <TouchableOpacity
      onPress={goToLogin}
      style={styles.iconButton}
      disabled={isDisable}
    >
      <View>
        <Image
          source={iconSource}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SIZES.extraLarge,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.extraLarge,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    ...SHADOWS.light,
  },
  buttonImg: {
    width: 24,
    height: 24,
    tintColor: COLORS.gray,
  },
  RectButtonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.extraLarge,
    padding: SIZES.small,
  },
  RectButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    textAlign: "center",
  },
  iconButton: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.extraLarge,
  },
  likeDislikeButtonContainer: {
    // backgroundColor: COLORS.green,

    borderColor: COLORS.primary,
    borderWidth: 1.5,
    borderRadius: SIZES.large,
    padding: 5,
    marginEnd: SIZES.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  likeDislikeButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    // fontSize: SIZES.large,
    fontSize: SIZES.extraLarge,
    textAlign: "center",
  },
  likeDislikeButtonSeparator: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    // fontSize: SIZES.large,
    fontSize: SIZES.medium,
    textAlign: "center",
  },
});
