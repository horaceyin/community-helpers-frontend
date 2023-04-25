import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SHADOWS, COLORS, SIZES, assets, FONTS } from "../../constants";
import { JobCardDetail } from "../components";
import { createDataArrayOne } from "../../utilities";

// var description =
//   "dfsdfsddfjl;gh klsdfjghjkldf shgjkdfsh gjkfsdh kjghdfsj ghklhdf skjhgkdfhks jfdsfsdf";
// const helpRequest = {
//   image: assets.food,
//   helpRequestDate: "2020-12-12",
//   helpRequestTime: "12:23:02",
//   title: "Help Request Title",
//   helpSeeker: { displayName: "helpSeeker displayName" },
//   location: "Help Request Location",
//   price: 20,
//   description: description,
//   state: "pending",
//   // takenHelpRequest: [
//   //   { userId: "4", user: { displayName: "displayName 4" } },
//   //   { userId: "3", user: { displayName: "displayName 3" } },
//   // ],
// };

const randomPics = [
  assets.english,
  assets.fixItem,
  assets.food,
  assets.myImages,
  assets.tv,
];

const MyJobDetailScreen = ({ route, navigation }) => {
  let helpRequest = route.params.data;

  let helpRequestsArray = createDataArrayOne(
    helpRequest.helpRequest,
    true,
    randomPics
  );

  var state = null;
  var stateStyles = null;
  if (helpRequest.state == "pending") {
    state = "Pending";
    stateStyles = styles.jobStatusPending;
  } else if (helpRequest.state == "ongoing") {
    state = "Ongoing";
    stateStyles = styles.jobStatusPending;
  } else {
    state = "Completed";
    stateStyles = styles.jobStatusDone;
  }

  return (
    <View style={styles.container}>
      <JobCardDetail helpRequest={helpRequestsArray[0]} />
      <View style={{ padding: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.primary,
            marginBottom: SIZES.large,
          }}
        >
          State
        </Text>
        <View style={[styles.jobStatus, stateStyles]}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.large,
              fontFamily: FONTS.bold,
            }}
          >
            {state}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyJobDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobStatus: {
    borderRadius: SIZES.base,
    padding: SIZES.small,
    alignItems: "center",
  },
  jobStatusPending: {
    backgroundColor: COLORS.pending,
  },
  jobStatusOngoing: {
    backgroundColor: COLORS.ongoing,
  },
  jobStatusDone: {
    backgroundColor: COLORS.done,
  },
});
