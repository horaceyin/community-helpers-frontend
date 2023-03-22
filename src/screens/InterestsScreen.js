import { StyleSheet, Text, View, SectionList, FlatList } from "react-native";
import React, { useState } from "react";
import {
  SIZES,
  SPACING,
  FONTS,
  COLORS,
  SHADOWS,
  interests,
} from "../../constants";
import { RectButton } from "../components";

const interestsScreenConfig = {
  pageTitle: "Select your interests",
  pageSubTitle: "Choose at least three interests to get started",
  nextButtonText: "Next",
  nextButtonWidth: "30%",
};

const InterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([[]]);

  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const handleInterestPress = (interest) => {
    if (selectedInterests.includes(interest)) {
      //remove interest
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      //   setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const renderInterestItem = ({ item, index }) => {
    const isSelected = selectedInterests.includes(item);
    return (
      <RectButton
        buttonText={item}
        handlePress={() => handleInterestPress(item)}
        extraContainerStyle={{
          backgroundColor: isSelected ? "#2196F3" : "#E0E0E0",
          ...styles.bubbleButton,
        }}
        extraTextStyle={{ color: isSelected ? "#FFFFFF" : "#000000" }}
      />
    );
  };

  const renderInterestSection = ({ item, index, section, separators }) => {
    return (
      <FlatList
        data={item.list}
        style={styles.sectionFlatList}
        keyExtractor={(item, index) => item + index}
        renderItem={renderInterestItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>{interestsScreenConfig.pageTitle}</Text>
        <Text style={styles.pageSubTitle}>
          {interestsScreenConfig.pageSubTitle}
        </Text>
      </View>
      <SectionList
        sections={interests}
        keyExtractor={(item, index) => item + index}
        renderItem={renderInterestSection}
        renderSectionHeader={renderSectionHeader}
      />
      <RectButton
        buttonText={interestsScreenConfig.nextButtonText}
        extraContainerStyle={styles.nextButtonExtraStyle}
      />
    </View>
  );
};

export default InterestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SPACING * 2,
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
  pageSubTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    paddingHorizontal: SPACING * 4,
    textAlign: "center",
  },
  sectionHeader: {
    backgroundColor: "#F5F5F5",
    padding: SPACING,
  },
  sectionHeaderText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
    color: COLORS.body,
  },
  sectionFlatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: SPACING,
  },
  bubbleButton: {
    backgroundColor: COLORS.bg,
    minWidth: "20%",
    marginVertical: SPACING,
    marginHorizontal: SPACING * 0.5,
  },
  nextButtonExtraStyle: {
    alignSelf: "flex-end",
    minWidth: interestsScreenConfig.nextButtonWidth,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    marginVertical: SPACING,
    ...SHADOWS.light,
  },
});
