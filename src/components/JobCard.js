import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SHADOWS, COLORS, SIZES, assets } from "../../constants";
import { CircleButton, RectButton } from "./Button";
import { SubInfo, JobsTitle, JobsPrice } from "./SubInfo";

const JobCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          source={data.image}
          resizeMode="cover"
          style={styles.cardImage}
        />
        {/* <CircleButton imgUrl={assets.check} top={10} right={10}/> */}
      </View>

      <SubInfo jobsDate={data.jobsDate} jobsTime={data.jobsTime} />

      <View style={{ width: "100%", padding: SIZES.font }}>
        <JobsTitle
          title={data.title}
          subTitle={data.helpSeeker}
          titleSize={SIZES.large}
          subTitleSize={SIZES.medium}
          location={data.location}
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
          <JobsPrice price={data.price} />
          <RectButton
            buttonText={"Details"}
            minWidth={"15%"}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("JobsDetails", { data })}
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
});

export default JobCard;
