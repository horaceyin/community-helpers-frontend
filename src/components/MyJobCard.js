import { React, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SHADOWS, COLORS, SIZES, FONTS } from "../../constants";
const MyJobCard = ({ data, navigation }) => {
  const [text, setText] = useState(data.helpRequest.description.slice(0, 100));

  let d = new Date(data.helpRequest.helpRequestDatetime).toDateString();
  const date = d.split(" ");
  var title = data.helpRequest.title;
  if (title.length > 25) {
    title = title.slice(0, 24);
    title += " ...";
  }
  var state = null;
  var stateStyles = null;
  if (data.state == "pending") {
    state = "Pending";
    stateStyles = styles.jobStatusPending;
  } else if (data.state == "ongoing") {
    state = "Ongoing";
    stateStyles = styles.jobStatusOngoing;
  } else {
    state = "Completed";
    stateStyles = styles.jobStatusDone;
  }

  const handleJobsPress = () => {
    navigation.navigate("MyJobDetail", {
      data,
    });
  };

  return (
    <TouchableOpacity onPress={handleJobsPress}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.extraLarge - 3,
                color: COLORS.primary,
                width: "75%",
              }}
            >
              {title}
            </Text>
            <View style={[styles.jobStatus, stateStyles]}>
              <Text style={{ color: COLORS.white }}>{state}</Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.medium,
              color: COLORS.primary,
              marginBottom: SIZES.base,
            }}
          >{`${data.helpRequest.helpSeeker.displayName}`}</Text>

          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.medium,
              color: COLORS.primary,
            }}
          >{`Date: ${date[3]}/${date[1]}/${date[2]}`}</Text>

          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: SIZES.small,
              color: COLORS.primary,
              marginVertical: SIZES.base,
              maxWidth: "70%",
            }}
          >
            {text + " ..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    margin: SIZES.base,
    ...SHADOWS.medium,
  },
  card: {
    width: "100%",
    height: 170,
    padding: SIZES.font,
  },
  jobStatus: {
    borderRadius: SIZES.extraLarge,
    padding: SIZES.small,
    alignItems: "center",
    alignSelf: "flex-end",
    width: "25%",
  },
  jobStatusPending: {
    backgroundColor: COLORS.pending,
  },
  jobStatusOngoing: {
    backgroundColor: COLORS.ongoing,
  },
  jobStatusDone: {
    backgroundColor: COLORS.done,
  },
});

export default MyJobCard;
