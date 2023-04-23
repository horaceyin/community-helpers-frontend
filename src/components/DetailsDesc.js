import { View, Text } from "react-native";
import { React, useState, memo } from "react";
import { JobsPrice, JobsTitle } from "./SubInfo";
import { COLORS, FONTS, SIZES } from "../../constants";
import { LikeDislikeButton } from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLogin, selectUserInfo } from "../features/AuthSlice";
import {
  selectHelpRequestsAction,
  selectRequest,
  findAndReplace,
} from "../features/UserActionSlice";
import { useMutation } from "@apollo/client";
import { SEND_USER_ACTION } from "../gql/Mutation";

const DetailsDesc = ({ reduxIndex }) => {
  const thisRequest = useSelector((state) => selectRequest(state, reduxIndex));
  const dispatch = useDispatch();

  const sliceSize = 50;
  const [text, setText] = useState(thisRequest.description.slice(0, sliceSize));
  const [readMore, setReadMore] = useState(false);

  const helpRequestId = thisRequest.id;
  const isLogin = useSelector(selectIsLogin);
  const userId = isLogin ? useSelector(selectUserInfo).id : null;
  const helpRequestsAction = useSelector(selectHelpRequestsAction);

  const [sendUserActionMutation, sendUserActionResult] =
    useMutation(SEND_USER_ACTION);

  // const globalSetLike = useSelector(selectSetLike);
  // const globalSetDislike = useSelector(selectSetDislike);

  // const dispatch = useDispatch();

  // //for send user action cookie to server
  // const [getMyInfo, getMyInfoResult] = useLazyQuery(ME);

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

  return (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <JobsTitle
          title={thisRequest.title}
          subTitle={thisRequest.helpSeeker.displayName}
          location={thisRequest.location}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.medium}
          locationSize={SIZES.small}
        />
        <JobsPrice price={thisRequest.price} />
      </View>

      <View
        style={{
          marginTop: SIZES.large,
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

      <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
        <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          Description
        </Text>

        <View style={{ marginTop: SIZES.base }}>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.regular,
              color: COLORS.secondary,
              lineHeight: SIZES.large,
            }}
          >
            Description
          </Text>
          <View style={{ marginTop: SIZES.base }}>
            <Text
              style={{
                fontSize: SIZES.small,
                fontFamily: FONTS.regular,
                color: COLORS.secondary,
                lineHeight: SIZES.large,
              }}
            >
              {" "}
              {text}
              {!readMore && "..."}
              <Text
                style={{
                  fontSize: SIZES.small,
                  fontFamily: FONTS.semiBold,
                  color: COLORS.primary,
                }}
                onPress={() => {
                  if (!readMore) {
                    setText(thisRequest.description);
                    setReadMore(true);
                  } else {
                    setText(thisRequest.description.slice(0, 50));
                    setReadMore(false);
                  }
                }}
              >
                {readMore ? " Show Less" : " Read More"}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default memo(DetailsDesc);
