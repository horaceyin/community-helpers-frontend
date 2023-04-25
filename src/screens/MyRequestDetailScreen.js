import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SHADOWS, COLORS, SIZES, assets, FONTS } from "../../constants";
import { RectButton, JobCardDetail, CandidateHelper } from "../components";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import { SEEKER_ACCEPT_HELPER, SEEKER_COMPLETE_REQUEST } from "../gql/Mutation";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import {
  findAndReplaceHelperList,
  selectMyRequests,
} from "../features/UserActionSlice";
import { Text } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay/lib";

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

  const isOngoningOrCompleted = helpRequest.takenHelpRequests.filter(
    (thr) => thr.is_taken === true
  );

  if (isOngoningOrCompleted[0])
    helpRequest.takenHelpRequests = isOngoningOrCompleted;

  const [checked, setChecked] = useState(-1);
  const [selectedDisplayName, setSelectedDisplayName] = useState(null);

  const [loading, setLoading] = useState(true);
  // const [buttonText, setbuttonText] = useState("Accept Helper");

  const theme = useTheme();

  const [helperList, setHelperList] = useState([]);

  const handleSetChecked = useCallback((userId, displayName) => {
    setChecked(userId);
    setSelectedDisplayName(displayName);
  }, []);

  const [acceptHelper, acceptHelperResult] = useMutation(SEEKER_ACCEPT_HELPER);
  const [seekerComplete, seekerCompleteResult] = useMutation(
    SEEKER_COMPLETE_REQUEST
  );

  useEffect(() => {
    const createHelpRequestObjAndSetDefaultChecked = () => {
      if (helpRequest.takenHelpRequests.length > 0) {
        setChecked(helpRequest.takenHelpRequests[0].userId);
        setSelectedDisplayName(
          helpRequest.takenHelpRequests[0].user.displayName
        );
      }
      setLoading(false);
    };

    createHelpRequestObjAndSetDefaultChecked();
  }, []);

  const handleAcceptHelperPress = () => {
    acceptHelper({
      variables: {
        helpRequestId: helpRequest.id,
        userId: checked,
      },
      onCompleted: () => {
        alert(`You have accepted ${selectedDisplayName} as your helper.`);
      },
      onError: (error) => {
        console.log(JSON.stringify(error, null, 2));
      },
    });
    let newHelperList = JSON.stringify(thisMyRequest.takenHelpRequests);
    newHelperList = JSON.parse(newHelperList);

    newHelperList = newHelperList.filter(
      (eachCommit) => eachCommit.userId === checked
    );
    newHelperList[0].is_taken = true;
    newHelperList[0].state = "ongoing";

    dispatch(
      findAndReplaceHelperList({
        oneHelperList: newHelperList,
        index: reduxIndex,
      })
    );
  };

  const handleCompletePress = () => {
    seekerComplete({
      variables: {
        helpRequestId: thisMyRequest.id,
        userId: thisMyRequest.takenHelpRequests[0].userId,
        state: "completed",
      },
      onCompleted: () => {
        alert(`Your request has been completed.`);
      },
      onError: (error) => {
        console.log(JSON.stringify(error, null, 2));
      },
    });

    let oneHelperList = JSON.stringify(thisMyRequest.takenHelpRequests);
    oneHelperList = JSON.parse(oneHelperList);
    oneHelperList[0].state = "completed";

    dispatch(
      findAndReplaceHelperList({
        oneHelperList: oneHelperList,
        index: reduxIndex,
      })
    );
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
      <Spinner
        visible={acceptHelperResult.loading || seekerCompleteResult.loading}
        textStyle={{ fontFamily: FONTS.medium }}
        overlayColor="rgba(205, 215, 226, 0.8)"
        color="#463451"
        // textContent={"Loading...\nPlease wait..."}
      />
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
              {helpRequest.takenHelpRequests.length === 1 &&
              helpRequest.takenHelpRequests[0].is_taken === true ? (
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.large,
                    color: COLORS.primary,
                  }}
                >
                  Your Helper
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.large,
                    color: COLORS.primary,
                  }}
                >
                  Matched Candidate Helpers
                </Text>
              )}
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
                      buttonText={"Accept Helper"}
                      minWidth={"100%"}
                      fontSize={SIZES.font}
                      handlePress={handleAcceptHelperPress}
                    />
                  )}

                {helpRequest.takenHelpRequests[0].state === "ongoing" && (
                  <RectButton
                    buttonText={"Complete"}
                    minWidth={"100%"}
                    fontSize={SIZES.font}
                    handlePress={handleCompletePress}
                  />
                )}

                {helpRequest.takenHelpRequests[0].state === "completed" && (
                  <Text variant="titleMedium">
                    This request has been completed.
                  </Text>
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
  },
});
