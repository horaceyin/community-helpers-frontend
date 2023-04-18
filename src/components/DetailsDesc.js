import { View, Text } from "react-native";
import { React, useState } from "react";
import { JobsPrice, JobsTitle } from "./SubInfo";
import { COLORS, FONTS, SIZES } from "../../constants";
import { LikeDislikeButton } from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLogin, selectUserInfo } from "../features/AuthSlice";
import {
  saveUserAction,
  selectHelpRequestsAction,
} from "../features/UserActionSlice";
import { useMutation } from "@apollo/client";
import { SEND_USER_ACTION } from "../gql/Mutation";

const DetailsDesc = ({ helpRequest, ...prop }) => {
  const sliceSize = 50;
  const [text, setText] = useState(helpRequest.description.slice(0, sliceSize));
  const [readMore, setReadMore] = useState(false);

  var [isLikePress, setIsLikePress] = useState(false);
  var [isDislikePress, setIsDislikePress] = useState(false);

  if (prop.isLikePress) setIsLikePress(true);
  if (prop.isDislikePress) setIsDislikePress(true);

  const helpRequestId = helpRequest.id;
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
        helpRequestId: helpRequestId,
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

  const handleLikeButtonPress = async () => {
    if (!isLikePress && !isDislikePress) {
      setIsLikePress(true);
      handleSendUserAction("like");
      // dispatch(
      //   saveUserAction({ userId, helpRequestId, actionType: "liked" })
      // );
    } else {
      alert("You have already liked/disliked this request");
    }
  };

  const handleDislikeButtonPress = async () => {
    if (!isLikePress && !isDislikePress) {
      setIsDislikePress(true);
      handleSendUserAction("dislike");
      // dispatch(
      //   saveUserAction({ userId, helpRequestId, actionType: "liked" })
      // );
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
          title={helpRequest.title}
          subTitle={helpRequest.helpSeeker.displayName}
          location={helpRequest.location}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.medium}
          locationSize={SIZES.small}
        />
        <JobsPrice price={helpRequest.price} />
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
            isLikePress={isLikePress}
            isDislikePress={isDislikePress}
            handleLikePress={handleLikeButtonPress}
            handleDislikePress={handleDislikeButtonPress}
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
                    setText(helpRequest.description);
                    setReadMore(true);
                  } else {
                    setText(helpRequest.description.slice(0, 50));
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

export default DetailsDesc;
