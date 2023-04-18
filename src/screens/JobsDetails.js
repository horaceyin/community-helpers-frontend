import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useState, useContext } from "react";
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../../constants";
import {
  CircleButton,
  SubInfo,
  FocusedStatusBar,
  RectButton,
  DetailsCategories,
  DetailsDesc,
} from "../components/";
import { useMutation } from "@apollo/client";
import { AppContext } from "../../AppContext";
import { UPDATE_HELP_REQUEST } from "../gql/Mutation";
import { selectIsLogin, selectUserInfo } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  collectUserAction,
  addUserAction,
  saveUserAction,
} from "../features/UserActionSlice";

const DetailsHeader = ({ helpRequest, navigation }) => (
  <View style={{ width: "100%", height: 250 }}>
    <Image
      source={helpRequest.image}
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

const JobsDetails = ({ route, navigation }) => {
  const isLogin = useSelector(selectIsLogin);
  const userId = isLogin ? useSelector(selectUserInfo).id : null;
  const dispatch = useDispatch();
  const helpRequest = route.params.helpRequest;

  // const isLikePress = route.params.isLikePress;
  // const isDislikePress = route.params.isDislikePress;
  // const handleLikeButtonPress = route.params.handleLikeButtonPress;
  // const handleDislikeButtonPress = route.params.handleDislikeButtonPress;

  const [updateRequest, { data: updatedRequest, loading, error }] =
    useMutation(UPDATE_HELP_REQUEST);

  if (isLogin) {
    // dispatch(
    //   saveUserAction({
    //     userId,
    //     helpRequestId: helpRequest.id,
    //     actionType: "viewed",
    //   })
    // );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FocusedStatusBar barStyle="dark-content" backgroundColor="transparent" />
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
        {isLogin && (
          <RectButton
            buttonText={"Accept"}
            minWidth={170}
            fontSize={SIZES.large}
            {...SHADOWS.dark}
            handlePress={() =>
              updateRequest({
                variables: {
                  updateHelpRequestMatchingInput: {
                    id: helpRequest.id,
                    state: "ongoing",
                  },
                },
              }).then((data) => {
                navigation.replace("Root");
              })
            }
          />
        )}
      </View>

      <FlatList
        data={helpRequest.categories}
        renderItem={({ item }) => <DetailsCategories category={item} />}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.font * 3 }}
        ListHeaderComponent={() => (
          <>
            <DetailsHeader helpRequest={helpRequest} navigation={navigation} />
            <SubInfo
              helpRequestDate={helpRequest.helpRequestDate}
              helpRequestTime={helpRequest.helpRequestTime}
            />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc helpRequest={helpRequest} {...route.params} />
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
