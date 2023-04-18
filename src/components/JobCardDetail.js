import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SHADOWS, COLORS, SIZES, assets, FONTS } from "../../constants";
import { CircleButton, RectButton, LikeDislikeButton } from "./Button";
import { SubInfo, JobsTitle, JobsPrice } from "./SubInfo";
import { useState } from "react";

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.helpRequest.id === nextProps.helpRequest.id;
}

const JobCardDetail = ({ helpRequest }) => {
  var [isLikePress, setIsLikePress] = React.useState(false);
  var [isDislikePress, setIsDislikePress] = React.useState(false);
  const navigation = useNavigation();
  const sliceSize = 50;
  const [text, setText] = useState(helpRequest.description.slice(0, sliceSize));
  const [readMore, setReadMore] = useState(false);

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
        </View>
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
  // likeButton: {},
});

export default React.memo(JobCardDetail, areEqual);
