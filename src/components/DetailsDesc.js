import { View, Text } from "react-native";
import { React, useState } from "react";
import { JobsPrice, JobsTitle } from "./SubInfo";
import { COLORS, FONTS, SIZES } from "../../constants";
import { LikeDislikeButton } from "./Button";

const DetailsDesc = ({ helpRequest }) => {
  const sliceSize = 50;
  const [text, setText] = useState(helpRequest.description.slice(0, sliceSize));
  const [readMore, setReadMore] = useState(false);
  var [isLikePress, setIsLikePress] = useState(false);
  var [isDislikePress, setIsDislikePress] = useState(false);

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
