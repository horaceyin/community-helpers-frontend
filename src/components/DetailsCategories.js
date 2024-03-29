import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants";

const DetailsCategories = ({ category }) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.white,
          backgroundColor: COLORS.secondary,
          maxWidth: 100,
          textAlign: "center",
        }}
      >
        {category}
      </Text>
    </View>
  );
};

export default DetailsCategories;
