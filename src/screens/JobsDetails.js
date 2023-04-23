import { View, Text, Image, StatusBar, FlatList, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../../constants";
import {
  CircleButton,
  SubInfo,
  FocusedStatusBar,
  RectButton,
  DetailsCategories,
  DetailsDesc,
} from "../components/";
import { useMutation, useLazyQuery } from "@apollo/client";
import { AppContext } from "../../AppContext";
import {
  UPDATE_HELP_REQUEST,
  SEND_USER_ACTION,
  COMMIT_HELP_REQUEST,
} from "../gql/Mutation";
import { selectIsLogin, selectUserInfo } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectRequest, findAndReplace } from "../features/UserActionSlice";
import { FIND_MATCH_BY_STATE } from "../gql/Query";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay/lib";

const DetailsHeader = ({ reduxIndex }) => {
  const navigation = useNavigation();
  const thisRequest = useSelector((state) => selectRequest(state, reduxIndex));
  return (
    <View style={{ width: "100%", height: 250 }}>
      <Image
        source={
          thisRequest.images
            ? { uri: thisRequest.images }
            : thisRequest.fakeImage
        }
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <CircleButton
        imgUrl={assets.leftArrow}
        handlePress={() => navigation.goBack()}
        left={15}
        top={StatusBar.currentHeight + 10}
      />

      <CircleButton
        imgUrl={assets.check}
        handlePress={() => {}}
        right={15}
        top={StatusBar.currentHeight + 10}
      />
    </View>
  );
};

const JobsDetails = ({ route }) => {
  const theme = useTheme();
  const [sendViewedAction, setSendViewedAction] = useState(true);

  const reduxIndex = route.params.reduxIndex;
  const thisRequest = useSelector((state) => selectRequest(state, reduxIndex));

  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const userId = isLogin ? useSelector(selectUserInfo).id : null;

  const [commitRequest, commitRequestResult] = useMutation(COMMIT_HELP_REQUEST);

  const [sendUserActionMutation, sendUserActionResult] =
    useMutation(SEND_USER_ACTION);

  // const [
  //   getCommitJob,
  //   {
  //     loading: getCommitLoading,
  //     error: getCommitError,
  //     data: getCommitData,
  //     refetch: getCommitRefetch,
  //     called: getCommitCalled,
  //   },
  // ] = useLazyQuery(FIND_MATCH_BY_STATE);

  const handleSendUserAction = useCallback(async (actionType) => {
    await sendUserActionMutation({
      variables: {
        userId: userId,
        helpRequestId: thisRequest.id,
        actionType: actionType,
      },
      onCompleted: (result) => {
        console.log("sendUserActionMutation completed", actionType);
        if (actionType === "view") {
          setSendViewedAction(false);
        }
      },
      onError: (error) => {
        console.log(`Apollo error: ${error.message}`);
      },
    });
  }, []);

  useEffect(() => {
    async function triggerUserAction() {
      if (isLogin) {
        handleSendUserAction("view");
      }
    }
    triggerUserAction();
  }, []);

  const updateRequestInRedux = useCallback(() => {
    let newRequestObj = JSON.stringify(thisRequest);
    newRequestObj = JSON.parse(newRequestObj);
    newRequestObj.takenUserId.push(userId);
    dispatch(findAndReplace({ index: reduxIndex, current: newRequestObj }));
  }, []);

  const handleCommitRequest = useCallback(async () => {
    console.log(thisRequest.id, userId);
    await commitRequest({
      variables: {
        takenHelpRequestUncheckedCreateInput: {
          helpRequestId: thisRequest.id,
          userId: userId,
        },
      },
      onCompleted: async (result) => {
        handleSendUserAction("commit");
        updateRequestInRedux(); //for hiding the accept button
        console.log("commitRequest completed");
        alert("You have committed to this request !");
        // navigation.replace("Root");
      },
      onError: (error) => {
        console.log(JSON.stringify(error, null, 2));
        console.log(`Apollo error: ${error.message}`);
      },
    });
  }, []);

  const handleCommitButtonPress = useCallback(() => {
    handleCommitRequest();
  }, []);

  if (sendViewedAction)
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
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FocusedStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Spinner
        visible={commitRequestResult.loading}
        textStyle={{ fontFamily: FONTS.medium }}
        overlayColor="rgba(205, 215, 226, 0.8)"
        color="#463451"
        // textContent={"Loading...\nPlease wait..."}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          zIndex: 1,
        }}
      >
        {isLogin && !thisRequest.takenUserId.includes(userId) && (
          <RectButton
            buttonText={"Accept"}
            minWidth={170}
            fontSize={SIZES.large}
            {...SHADOWS.dark}
            handlePress={handleCommitButtonPress}
          />
        )}
      </View>

      <FlatList
        data={thisRequest.categories}
        renderItem={({ item }) => <DetailsCategories category={item} />}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.font * 3 }}
        ListHeaderComponent={() => (
          <>
            <DetailsHeader reduxIndex={reduxIndex} />
            <SubInfo
              helpRequestDate={thisRequest.helpRequestDate}
              helpRequestTime={thisRequest.helpRequestTime}
            />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc reduxIndex={reduxIndex} />
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: SIZES.font,
                  color: COLORS.primary,
                }}
              >
                Categories
              </Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default JobsDetails;
