import { StyleSheet, Text, View, SectionList, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import {
  SIZES,
  SPACING,
  FONTS,
  COLORS,
  SHADOWS,
  interests,
} from "../../constants";
import { RectButton } from "../components";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_INTERESTS } from "../gql/Mutation";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../features/AuthSlice";

const interestsScreenConfig = {
  pageTitle: "Select your interests",
  pageSubTitle: "Choose at least three interests to get started",
  clearButtonText: "Clear",
  nextButtonText: "Next",
  nextButtonWidth: "40%",
  activityIndicatorSize: 36,
};

const InterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const userInfo = useSelector(selectUserInfo);
  const [errorLoading, setErrorLoading] = useState(false);
  const [updateUserInterestsMutation, updateUserInterestsResult] = useMutation(
    UPDATE_USER_INTERESTS
  );

  useEffect(() => {}, []);

  const handleNextButtonPress = async () => {
    await updateUserInterestsMutation({
      variables: {
        categories: selectedInterests,
        userId: userInfo.id,
      },
      onCompleted: (result) => {
        setErrorLoading(false);
        navigation.reset({ index: 0, routes: [{ name: "Root" }] });
      },
      onError: (error) => {
        setErrorLoading(true);
        console.log(`Apollo error: ${error.message}`);
      },
    });

    navigation.reset({ index: 0, routes: [{ name: "Root" }] });
  };

  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const handleInterestPress = (interest, index) => {
    if (selectedInterests.includes(interest)) {
      //remove interest
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
    console.log(selectedInterests);
  };

  const renderInterestItem = ({ item, index }) => {
    const isSelected = selectedInterests.includes(item);
    const backgroundColor = isSelected ? "#8CACD4" : "#E0E0E0";
    const color = isSelected ? "#FFFFFF" : COLORS.primary;
    return (
      <RectButton
        buttonText={item}
        handlePress={() => handleInterestPress(item, index)}
        extraContainerStyle={{
          backgroundColor: backgroundColor,
          ...styles.bubbleButton,
        }}
        extraTextStyle={{ color: color }}
      />
    );
  };

  const renderInterestSection = ({ item, index, section, separators }) => {
    return (
      <FlatList
        data={item.list}
        style={styles.sectionFlatList}
        keyExtractor={(item) => item}
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
        keyExtractor={(item) => item.key}
        renderItem={renderInterestSection}
        renderSectionHeader={renderSectionHeader}
      />
      <View style={styles.bottomButtonContainer}>
        <RectButton
          handlePress={() => setSelectedInterests([])}
          buttonText={interestsScreenConfig.clearButtonText}
          extraContainerStyle={styles.nextButtonExtraStyle}
          extraTextStyle={styles.districtButtonTextExtraStyle}
        />
        <ActivityIndicator
          animating={updateUserInterestsResult.loading}
          color={MD2Colors.deepOrangeA400}
          size={interestsScreenConfig.activityIndicatorSize}
        />
        <RectButton
          handlePress={handleNextButtonPress}
          buttonText={interestsScreenConfig.nextButtonText}
          extraContainerStyle={styles.nextButtonExtraStyle}
          extraTextStyle={styles.districtButtonTextExtraStyle}
          disabled={selectedInterests.length < 3}
          RectButtonContainerDisabledStyle={styles.nextButtonContainerDisabled}
        />
      </View>
    </View>
  );
};

export default InterestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: SPACING,
  },
  bubbleButton: {
    minWidth: "20%",
    marginVertical: SPACING,
    marginHorizontal: SPACING * 0.5,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: SPACING,
  },
  nextButtonExtraStyle: {
    // alignSelf: "flex-end",
    minWidth: interestsScreenConfig.nextButtonWidth,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    ...SHADOWS.light,
  },
  districtButtonTextExtraStyle: {
    fontSize: SIZES.large,
  },
  row: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  nextButtonContainerDisabled: {
    minWidth: interestsScreenConfig.nextButtonWidth,
    backgroundColor: MD2Colors.blueGrey500,
    borderRadius: SPACING,
    // marginHorizontal: SPACING * 2,
    ...SHADOWS.light,
    opacity: 0.5,
  },
});
