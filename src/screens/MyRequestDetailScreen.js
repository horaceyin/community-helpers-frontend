import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { SHADOWS, COLORS, SIZES, assets, FONTS } from "../../constants";
import {
  RectButton,
  JobCardDetail,
  JobsDetails,
  CandidateHelper,
} from "../components";
import { RadioButton } from "react-native-paper";
import { createDataArrayOne } from "../../utilities";
import { HELPER_ACCEPT_HELP_REQUEST } from "../gql/Mutation";
import { useMutation } from "@apollo/client";

// var description =
//   "I'm looking for someone who can give me a cooking lesson. I'm interested in learning how to cook Chinese food.";
// const helpRequest = {
//   image: assets.food,
//   helpRequestDate: "2020-12-12",
//   helpRequestTime: "12:23:02",
//   title: "Cooking lesson",
//   helpSeeker: { displayName: "Ken" },
//   location: "123 Main St",
//   price: 20,
//   description: description,
//   takenHelpRequest: [
//     { userId: "4", user: { displayName: "Woody" } },
//     { userId: "3", user: { displayName: "Joe" } },
//   ],
// };

const randomPics = [
  assets.english,
  assets.fixItem,
  assets.food,
  assets.myImages,
  assets.tv,
];

const MyRequestDetailScreen = ({ route, navigation }) => {
  const [checked, setChecked] = React.useState(-1);
  const [helperList, setHelperList] = useState([]);
  // const [buttonText, setbuttonText] = useState("Accept Helper");

  console.log(route.params.data, "HHHHHHHHHHHHHHHHHHHHH");

  const [acceptHelper] = useMutation(HELPER_ACCEPT_HELP_REQUEST);

  let helpRequestObj = route.params.data;

  let helpRequestsArray = createDataArrayOne(helpRequestObj, true, randomPics);

  const helpRequest = helpRequestsArray[0];
  console.log(helpRequest, "%%%%%%%%%%%%%%%%%%%%%%");

  if (helpRequest.takenHelpRequests.length > 0) {
    setChecked(helpRequest.takenHelpRequests[0].userId);
    // setHelperList(helpRequest.takenHelpRequests);
    console.log(checked);
  }

  const handleAcceptHelperPress = () => {
    console.log("Accept Helper Pressed");
    acceptHelper({
      variables: {
        // helpRequestId: helpRequest.helpRequestId,
        // helperId: checked,
        createTakenHelpRequestInput: {
          helpRequestId: helpRequest.id,
          helperId: checked,
        },
      },
      // onCompleted: () => {
      //   setHelperList(helperList.filter((helper) => helper.userId === checked));
      //   setbuttonText("Complete");
      // },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={helpRequest.takenHelpRequests}
        renderItem={({ item }) => (
          <CandidateHelper
            helper={item}
            checked={checked}
            setChecked={setChecked}
          />
        )}
        keyExtractor={(item) => item.userId}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: SIZES.base }}
        ListHeaderComponent={() => (
          <>
            <JobCardDetail helpRequest={helpRequest} />
            <View style={{ padding: SIZES.font }}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: SIZES.large,
                  color: COLORS.primary,
                }}
              >
                Matched Candidate Helper
              </Text>
            </View>
          </>
        )}
        ListFooterComponent={() =>
          helpRequest.takenHelpRequests.length > 0 ? (
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
                  buttonText={buttonText}
                  minWidth={"100%"}
                  fontSize={SIZES.font}
                  handlePress={
                    buttonText == "Accept Helper"
                    // ? handleAcceptHelperPress
                    // : null
                  }
                />
              </View>
            </>
          ) : (
            <Text style={{ textAlign: "center", padding: SIZES.base }}>
              No helper commit to help you yet. Please wait for a while.
            </Text>
          )
        }
      />
    </View>
  );
};

export default MyRequestDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
