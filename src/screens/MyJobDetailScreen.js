import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SHADOWS, COLORS, SIZES, assets, FONTS } from "../../constants";
import {
  RectButton,
  JobCardDetail,
  JobsDetails,
  CandidateHelper,
} from "../components";
import { RadioButton } from "react-native-paper";
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
  // const [checked, setChecked] = React.useState(
  //   helpRequest.takenHelpRequest[0].userId
  // );
  // console.log(checked);

  // const createArray = async (rawRequest) => {
  //   console.log(rawRequest, "RRRRRRRRRRRRRRRRRRRRRRRRrr");
  //   return await createRenderDataArray(rawRequest, true, randomPics);
  // };

  console.log(helpRequest.helpRequest, "##########################3333");

  let helpRequestsArray = createDataArrayOne(
    helpRequest.helpRequest,
    true,
    randomPics
  );

  // console.log(helpRequestsArray, "#$#$#$#$#$#$#$");

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

      {/* <FlatList
        data={helpRequest.takenHelpRequest}
        renderItem={({ item }) => <CandidateHelper helper={item} checked={checked} setChecked={setChecked}/>}
        keyExtractor={(item) => item.userId}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: SIZES.base }}
        ListHeaderComponent={() => (
          <>
            <JobCardDetail helpRequest={helpRequest} />
          </>
        )}
        ListFooterComponent={()=> (
          <>
            <View
              style={{
                width: "100%",
                padding: SIZES.base,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <RectButton
                buttonText={"Accept Helper"}
                minWidth={"100%"}
                fontSize={SIZES.font}
                handlePress={() =>
                  {}
                }
              />
            </View>

          </>
        )}
      /> */}
    </View>
  );
};

export default MyJobDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
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
