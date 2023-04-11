import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SHADOWS, COLORS, SIZES, assets } from "../../constants";
import { CircleButton, RectButton, LikeDislikeButton } from "./Button";
import { SubInfo, JobsTitle, JobsPrice } from "./SubInfo";

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.helpRequest.id === nextProps.helpRequest.id;
}

const JobCard = ({ helpRequest }) => {
  console.log("55555555555555555");
  var [isLikePress, setIsLikePress] = React.useState(false);
  var [isDislikePress, setIsDislikePress] = React.useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          // may need to change this to multiple images
          source={helpRequest.image}
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
            handlePress={() =>
              navigation.navigate("JobsDetails", { helpRequest })
            }
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
          <LikeDislikeButton
            minWidth={"30%"}
            isLikePress={isLikePress}
            isDislikePress={isDislikePress}
            handleLikePress={() => {
              if (!isLikePress && !isDislikePress) setIsLikePress(true); // Handle like here
            }}
            handleDislikePress={() => {
              if (!isLikePress && !isDislikePress) setIsDislikePress(true); // Handle dislike here
            }}
          />
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
