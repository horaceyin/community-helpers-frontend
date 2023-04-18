import React, { useState } from "react";
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
} from "../features/UserActionSlice";

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.helpRequest.id === nextProps.helpRequest.id;
}

const JobCard = ({ helpRequest }) => {
  let [isLikePress, setIsLikePress] = useState(helpRequest.isLike);
  let [isDislikePress, setIsDislikePress] = useState(helpRequest.isDislike);
  const helpRequestId = helpRequest.id;
  const navigation = useNavigation();
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
  let userId = isLogin ? useSelector(selectUserInfo).id : null;

  console.log(helpRequest);

  // const handleLikeButtonPress = () => {
  //   if (!isLikePress && !isDislikePress) {
  //     setIsLikePress(true);
  //     dispatch(
  //       saveUserAction({ userId, helpRequestId, actionType: "liked" })
  //       // collectUserAction({ userId, helpRequestId, actionType: "liked" })
  //     );
  //   } else {
  //     alert("You have already liked/disliked this request");
  //   }
  // };

  // const handleDislikeButtonPress = () => {
  //   if (!isLikePress && !isDislikePress) {
  //     setIsDislikePress(true);
  //     dispatch(
  //       saveUserAction({ userId, helpRequestId, actionType: "liked" })
  //       // collectUserAction({ userId, helpRequestId, actionType: "disliked" })
  //     );
  //   } else {
  //     alert("You have already liked/disliked this request");
  //   }
  // };

  handleNavigation = () => {
    // dispatch(setLikeDislikeFunc({ setIsLikePress, setIsDislikePress }));
    navigation.navigate("JobsDetails", {
      helpRequest,
      isLikePress,
      isDislikePress,
    });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          // may need to change this to multiple images
          source={
            helpRequest.images
              ? { uri: helpRequest.images }
              : helpRequest.fakeImage
          }
          resizeMode="cover"
          style={styles.cardImage}
        />
        {/* <CircleButton imgUrl={assets.check} top={10} right={10}/> */}
      </View>

      <SubInfo
        helpRequestDate={helpRequest.helpRequestDate}
        helpRequestTime={helpRequest.helpRequestTime}
      />

      <View style={{ width: "100%", padding: SIZES.font }}>
        <JobsTitle
          title={helpRequest.title}
          subTitle={helpRequest.helpSeeker.displayName}
          titleSize={SIZES.large}
          subTitleSize={SIZES.medium}
          location={helpRequest.location}
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
          <JobsPrice price={helpRequest.price} />
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
              isLikePress={isLikePress}
              isDislikePress={isDislikePress}
              // handleLikePress={handleLikeButtonPress}
              // handleDislikePress={handleDislikeButtonPress}
              handleLikePress={() => {
                if (!isLikePress && !isDislikePress) setIsLikePress(true); // Handle like here
              }}
              handleDislikePress={() => {
                if (!isLikePress && !isDislikePress) setIsDislikePress(true); // Handle dislike here
              }}
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
