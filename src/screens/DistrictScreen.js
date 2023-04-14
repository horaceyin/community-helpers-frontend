import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { SIZES, SPACING, FONTS, COLORS, SHADOWS } from "../../constants";
import { district } from "../../constants";
import { RectButton } from "../components";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../gql/Mutation";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/AuthSlice";

const districtScreenConfig = {
  pageTitle: "Select your district",
  doneButtonWidth: "50%",
  doneButtonText: "Done",
  activityIndicatorSize: 36,
};

const DistrictScreen = ({ route, navigation }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const userInfo = useSelector(selectUserInfo);
  const [errorLoading, setErrorLoading] = useState(false);
  const [updateUserMutation, updateUserResult] = useMutation(UPDATE_USER);

  const handleDoneButtonPress = async () => {
    console.log(typeof(selectedDistrict))
    await updateUserMutation({
      variables: {
        updateUserInput: {
          district: selectedDistrict ,
        },
        userId: userInfo.id,
      },
      onCompleted: (result) => {
        setErrorLoading(false);
        navigation.reset({ index: 0, routes: [{ name: "Interests" }] });
      },
      onError: (error) => {
        setErrorLoading(true);
        console.log(JSON.stringify(error, null, 2));
        console.log(`Apollo error: ${error.message}`);
      },
    });
  };

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
      <View style={styles.buttonContainer}>
        <ActivityIndicator
          animating={updateUserResult.loading || errorLoading}
          color={MD2Colors.deepOrangeA400}
          size={districtScreenConfig.activityIndicatorSize}
        />
        <RectButton
          buttonText={districtScreenConfig.doneButtonText}
          extraContainerStyle={styles.doneButtonExtraStyle}
          extraTextStyle={styles.districtButtonTextExtraStyle}
          disabled={selectedDistrict ? false : true}
          RectButtonContainerDisabledStyle={styles.nextButtonContainerDisabled}
          handlePress={handleDoneButtonPress}
        />
      </View>
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
    fontSize: SIZES.xxLarge,
    color: COLORS.body,
    marginVertical: SPACING * 2,
  },
  flatListStyle: {
    // backgroundColor: COLORS.error,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  doneButtonExtraStyle: {
    minWidth: districtScreenConfig.doneButtonWidth,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    marginVertical: SPACING,
    marginHorizontal: SPACING * 2,
    marginRight: districtScreenConfig.activityIndicatorSize + SPACING * 2,
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
  nextButtonContainerDisabled: {
    minWidth: districtScreenConfig.doneButtonWidth,
    backgroundColor: MD2Colors.blueGrey500,
    borderRadius: SPACING,
    marginHorizontal: SPACING * 2,
    ...SHADOWS.light,
    opacity: 0.5,
  },
});
