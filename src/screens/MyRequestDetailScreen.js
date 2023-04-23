import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SHADOWS, COLORS, SIZES, assets, FONTS } from "../../constants";
import {
  RectButton,
  JobCardDetail,
  JobsDetails,
  CandidateHelper,
} from "../components";
import {
  RadioButton,
  ActivityIndicator,
  MD2Colors,
  useTheme,
} from "react-native-paper";
import { createDataArrayOne } from "../../utilities";
import { HELPER_ACCEPT_HELP_REQUEST } from "../gql/Mutation";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import {
  findAndReplaceHelperList,
  selectMyRequests,
} from "../features/UserActionSlice";

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

const MyRequestDetailScreen = ({ route }) => {
  const reduxIndex = route.params.reduxIndex;
  const dispatch = useDispatch();

  const thisMyRequest = useSelector((state) =>
    selectMyRequests(state, reduxIndex)
  );
  const helpRequest = thisMyRequest;

  console.log(helpRequest, "🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");

  const [checked, setChecked] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [buttonText, setbuttonText] = useState("Accept Helper");

  const theme = useTheme();

  const [helperList, setHelperList] = useState([]);

  const handleSetChecked = useCallback((userId) => {
    setChecked(userId);
  }, []);

  // let helpRequestObj = route.params.data;

  // let helpRequestsArray = createDataArrayOne(helpRequestObj, true, randomPics);

  // const helpRequest = helpRequestsArray[0];

  // console.log(helpRequest, "🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");

  const [acceptHelper] = useMutation(HELPER_ACCEPT_HELP_REQUEST);

  useEffect(() => {
    const createHelpRequestObjAndSetDefaultChecked = () => {
      if (helpRequest.takenHelpRequests.length > 0) {
        setChecked(helpRequest.takenHelpRequests[0].userId);
        // setHelperList(helpRequest.takenHelpRequests);
        console.log(checked);
      }
      setLoading(false);
    };

    createHelpRequestObjAndSetDefaultChecked();
  }, []);

  const handleAcceptHelperPress = () => {
    console.log("Accept Helper Pressed");
    // acceptHelper({
    //   variables: {
    //     // helpRequestId: helpRequest.helpRequestId,
    //     // helperId: checked,
    //     createTakenHelpRequestInput: {
    //       helpRequestId: helpRequest.id,
    //       helperId: checked,
    //     },
    //   },
    //   // onCompleted: () => {
    //   //   setHelperList(helperList.filter((helper) => helper.userId === checked));
    //   //   setbuttonText("Complete");
    //   // },
    // });
    let newHelperList = JSON.stringify(thisMyRequest.takenHelpRequests);
    newHelperList = JSON.parse(newHelperList);

    newHelperList = newHelperList.filter(
      (eachCommit) => eachCommit.userId === checked
    );
    newHelperList[0].is_taken = true;
    newHelperList[0].state = "ongoing";
    console.log("dispatch 1111111", reduxIndex, checked, newHelperList);
    dispatch(findAndReplaceHelperList({ newHelperList, reduxIndex }));
  };

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          // backgroundColor: MD2Colors.brown50,
          backgroundColor: theme.colors.appBar,
        }}
      >
        <ActivityIndicator color={MD2Colors.blueGrey600} size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={helpRequest.takenHelpRequests}
        renderItem={({ item }) => (
          <CandidateHelper
            helper={item}
            checked={checked}
            handleSetChecked={handleSetChecked}
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
                {helpRequest.takenHelpRequests[0].state !== "ongoing" &&
                  helpRequest.takenHelpRequests[0].state !== "completed" && (
                    <RectButton
                      buttonText={buttonText}
                      minWidth={"100%"}
                      fontSize={SIZES.font}
                      // handlePress={
                      //   buttonText == "Accept Helper"
                      //   // ? handleAcceptHelperPress
                      //   // : null
                      // }
                      handlePress={handleAcceptHelperPress}
                    />
                  )}
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
