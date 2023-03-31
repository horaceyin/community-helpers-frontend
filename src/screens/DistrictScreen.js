import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { SIZES, SPACING, FONTS, COLORS, SHADOWS } from "../../constants";
import { district } from "../../constants";
import { RectButton } from "../components";

const districtScreenConfig = {
  pageTitle: "Select your district",
  doneButtonWidth: "50%",
  doneButtonText: "Done",
};

const DistrictScreen = ({ route, navigation }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const myData = route.params.selectedInterests;
  console.log(myData);

  const renderDistrictItem = ({ item }) => {
    const backgroundColor = selectedDistrict === item ? "#8CACD4" : "#E0E0E0";
    const color = selectedDistrict === item ? "#FFFFFF" : COLORS.primary;
    return (
      <RectButton
        buttonText={item}
        fontSize={SIZES.font}
        handlePress={() => setSelectedDistrict(item)}
        extraContainerStyle={{
          backgroundColor: backgroundColor,
          ...styles.districtButton,
        }}
        extraTextStyle={{ color: color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>{districtScreenConfig.pageTitle}</Text>
      </View>
      <FlatList
        style={styles.flatListStyle}
        data={district}
        keyExtractor={(item) => item}
        renderItem={renderDistrictItem}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
      <RectButton
        buttonText={districtScreenConfig.doneButtonText}
        extraContainerStyle={styles.doneButtonExtraStyle}
        extraTextStyle={styles.districtButtonTextExtraStyle}
      />
    </View>
  );
};

export default DistrictScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING * 2,
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: SPACING * 2,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    // fontWeight: "bold",
    fontSize: SIZES.xxLarge,
    color: COLORS.body,
    marginVertical: SPACING * 2,
    // alignSelf: 'center',
  },
  flatListStyle: {
    // backgroundColor: COLORS.error,
  },
  doneButtonExtraStyle: {
    // alignSelf: "flex-end",
    minWidth: districtScreenConfig.doneButtonWidth,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    marginVertical: SPACING,
    ...SHADOWS.light,
  },
  districtButton: {
    minWidth: "20%",
    marginVertical: SPACING,
    marginHorizontal: SPACING * 0.5,
  },
  districtButtonTextExtraStyle: {
    fontSize: SIZES.large,
  },
  row: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: SPACING,
  },
});
