import { View, Text } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants";

const CandidateHelperCard = ({ helper }) => {
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
        {helper}
      </Text>
    </View>
  );
};

export default CandidateHelperCard;
