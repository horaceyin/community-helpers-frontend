import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SIZES, COLORS, SHADOWS, assets, FONTS } from "../../constants";

const JobsPrice = ({ price }) => {
  return (
    <View style={styles.jobsPrice}>
      <Image
        source={assets.dollar}
        resizeMode="contain"
        style={{ width: 20, height: 20, marginRight: 2 }}
      />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {price}
      </Text>
    </View>
  );
};

const JobsTitle = ({
  title,
  subTitle,
  titleSize,
  subTitleSize,
  location,
  locationSize,
}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: locationSize,
          color: COLORS.primary,
          marginVertical: SIZES.base,
          maxWidth: "70%",
        }}
      >
        {location}
      </Text>

      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: subTitleSize,
          color: COLORS.primary,
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
};

const Img = ({ imgUrl, index }) => {
  return (
    <View>
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={[styles.img, { marginLeft: index === 0 ? 0 : -SIZES.font }]}
      />
    </View>
  );
};

const CircleImgContainer = () => {
  return (
    <View style={styles.circleImgContainer}>
      {[assets.person01, assets.person02, assets.person03].map((img, index) => (
        <Img imgUrl={img} index={index} key={`img-${index}`} />
      ))}
    </View>
  );
};

const JobsDate = ({ helpRequestDate, helpRequestTime }) => {
  return (
    <View style={styles.jobsDate}>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        Jobs Date:
      </Text>

      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {/* dd/mm/yyyy */}
        {helpRequestDate}
      </Text>

      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {/* dd/mm/yyyy */}
        {helpRequestTime}
      </Text>
    </View>
  );
};

const SubInfo = ({ helpRequestDate, helpRequestTime }) => {
  return (
    <View style={styles.subInfo}>
      {/* <CircleImgContainer/> */}
      <JobsDate
        helpRequestDate={helpRequestDate}
        helpRequestTime={helpRequestTime}
      />
    </View>
  );
};

export { SubInfo, JobsTitle, JobsPrice };

const styles = StyleSheet.create({
  subInfo: {
    width: "100%",
    paddingHorizontal: SIZES.font,
    marginTop: -SIZES.extraLarge,
    flexDirection: "row",
    //justifyContent: 'space-between'
    justifyContent: "flex-end",
  },
  circleImgContainer: {
    flexDirection: "row",
  },
  img: {
    width: 48,
    height: 48,
  },
  jobsDate: {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
    maxWidth: "50%",
    elevation: 1,
  },
  jobsPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
});
