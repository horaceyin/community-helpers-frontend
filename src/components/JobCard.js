import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SHADOWS, COLORS, SIZES, assets } from "../../constants";
import { CircleButton, RectButton, LikeDislikeButton } from "./Button";
import { SubInfo, JobsTitle, JobsPrice } from "./SubInfo";
import { selectIsLogin, selectUserInfo } from "../features/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  collectUserAction,
  addUserAction,
  saveUserAction,
  addRequest,
  selectNum,
  findAndReplace,
  selectRequest,
} from "../features/UserActionSlice";
import { SEND_USER_ACTION } from "../gql/Mutation";
import { useMutation } from "@apollo/client";

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.helpRequestData.id === nextProps.helpRequestData.id;
}

const JobCard = ({ helpRequestData, reduxIndex }) => {
  // const helpRequest = useMemo(() => helpRequestData, [helpRequestData]);

  const navigation = useNavigation();
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
  let userId = isLogin ? useSelector(selectUserInfo).id : null;

  const thisRequest = useSelector((state) => selectRequest(state, reduxIndex));
  // console.log(thisRequest, "$$$$$$$");

  const [sendUserActionMutation, sendUserActionResult] =
    useMutation(SEND_USER_ACTION);

  const handleSendUserAction = async (actionType) => {
    await sendUserActionMutation({
      variables: {
        userId: userId,
        helpRequestId: thisRequest.id,
        actionType: actionType,
      },
      onCompleted: (result) => {
        console.log("sendUserActionMutation completed");
      },
      onError: (error) => {
        console.log(`Apollo error: ${error.message}`);
      },
    });
  };

  const updateRequestInRedux = (preference) => {
    let newRequestObj = JSON.stringify(thisRequest);
    newRequestObj = JSON.parse(newRequestObj);
    newRequestObj.isLike = preference === "like" ? true : false;
    newRequestObj.isDislike = preference === "dislike" ? true : false;
    dispatch(findAndReplace({ index: reduxIndex, current: newRequestObj }));
  };

  const handleLikeDisLikeButtonPress = async (preference) => {
    if (thisRequest && !thisRequest.isLike && !thisRequest.isDislike) {
      updateRequestInRedux(preference);
      handleSendUserAction(preference);
    } else {
      alert("You have already liked/disliked this request");
    }
  };

  // const handleLikeButtonPress = async () => {
  //   if (thisRequest && !thisRequest.isLike && !thisRequest.isDislike) {
  //     updateRequestInRedux("like");
  //     handleSendUserAction("like");
  //     // dispatch(
  //     //   saveUserAction({ userId, helpRequestId, actionType: "liked" })
  //     // );
  //   } else {
  //     alert("You have already liked/disliked this request");
  //   }
  // };

  // const handleDislikeButtonPress = async () => {
  //   if (thisRequest && !thisRequest.isLike && !thisRequest.isDislike) {
  //     updateRequestInRedux("dislike");
  //     handleSendUserAction("dislike");
  //     // dispatch(
  //     //   saveUserAction({ userId, helpRequestId, actionType: "liked" })
  //     // );
  //   } else {
  //     alert("You have already liked/disliked this request");
  //   }
  // };

  handleNavigation = () => {
    // dispatch(setLikeDislikeFunc({ setIsLikePress, setIsDislikePress }));
    navigation.navigate("JobsDetails", {
      reduxIndex,
    });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          // may need to change this to multiple images
          source={
            thisRequest.images
              ? { uri: thisRequest.images }
              : thisRequest.fakeImage
          }
          resizeMode="cover"
          style={styles.cardImage}
        />
        {/* <CircleButton imgUrl={assets.check} top={10} right={10}/> */}
      </View>

      <SubInfo
        helpRequestDate={thisRequest.helpRequestDate}
        helpRequestTime={thisRequest.helpRequestTime}
      />

      <View style={{ width: "100%", padding: SIZES.font }}>
        <JobsTitle
          title={thisRequest.title}
          subTitle={thisRequest.helpSeeker.displayName}
          titleSize={SIZES.large}
          subTitleSize={SIZES.medium}
          location={thisRequest.location}
          locationSize={SIZES.small}
        />
        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <JobsPrice price={thisRequest.price} />
          <RectButton
            buttonText={"Details"}
            minWidth={"15%"}
            fontSize={SIZES.font}
            handlePress={handleNavigation}
          />
        </View>
        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {isLogin && (
            <LikeDislikeButton
              minWidth={"30%"}
              isLikePress={thisRequest ? thisRequest.isLike : false}
              isDislikePress={thisRequest ? thisRequest.isDislike : false}
              handleLikePress={() => handleLikeDisLikeButtonPress("like")}
              handleDislikePress={() => handleLikeDisLikeButtonPress("dislike")}
              // handleLikePress={() => {
              //   if (!isLikePress && !isDislikePress) setIsLikePress(true); // Handle like here
              // }}
              // handleDislikePress={() => {
              //   if (!isLikePress && !isDislikePress) setIsDislikePress(true); // Handle dislike here
              // }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    margin: SIZES.base,
    marginBottom: SIZES.extraLarge,
    ...SHADOWS.dark,
  },
  card: {
    width: "100%",
    height: 250,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font,
  },
  likeButton: {},
});

export default React.memo(JobCard, areEqual);
