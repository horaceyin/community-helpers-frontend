import { React, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SHADOWS, COLORS, SIZES, FONTS, SPACING } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  findAndReplace,
  selectMyRequests,
  findAndReplaceHelperList,
} from "../features/UserActionSlice";
const MyRequestCard = ({ navigation, reduxIndex }) => {
  // const reduxIndex = myRequest.requestIndex
  const data = useSelector((state) => selectMyRequests(state, reduxIndex));
  const dispatch = useDispatch();
  const [text, setText] = useState(data.description.slice(0, 50));

  let d = new Date(data.helpRequestDatetime).toDateString();
  const date = d.split(" ");
  var title = data.title;
  if (title.length > 25) {
    title = title.slice(0, 24);
    title += " ...";
  }
  var state = null;
  var stateStyles = null;

  // ***** may need to change to []
  if (data.takenHelpRequests.length === 0) {
    // means no one has committed the request
    state = "Pending";
    stateStyles = styles.jobStatusPending;
  } else {
    // check if a seeker accepted any helper's commit
    const isTakenHelpRequst = data.takenHelpRequests.filter(
      (thr) => thr.is_taken === true
    );

    //  means I didn't accept any helper's commit
    if (isTakenHelpRequst.length <= 0) {
      state = "Pending";
      stateStyles = styles.jobStatusPending;
    } else {
      // replace takenHelpRequests array with one helper element
      // dispatch(
      //   findAndReplaceHelperList({
      //     oneHelperList: isTakenHelpRequst,
      //     index: reduxIndex,
      //   })
      // );
      const theMatch = isTakenHelpRequst[0];
      state = theMatch.state === "ongoing" ? "Ongoing" : "Completed";

      stateStyles =
        theMatch.state === "ongoing"
          ? styles.jobStatusOngoing
          : styles.jobStatusDone;
    }
  }

  const handleRequestPress = () => {
    navigation.navigate("MyRequestDetail", {
      reduxIndex,
    });
  };

  return (
    <TouchableOpacity onPress={handleRequestPress}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
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
    height: 130,
    padding: SIZES.font,
  },
  jobStatus: {
    borderRadius: SIZES.extraLarge,
    padding: SIZES.small,
    alignItems: "center",
    width: "30%",
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

export default MyRequestCard;
