import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SHADOWS, COLORS, SIZES, assets, FONTS } from "../../constants";
import { RectButton, JobCardDetail, JobsDetails, CandidateHelper } from "../components";
import { RadioButton } from "react-native-paper";

var description = "dfsdfsddfjl;gh klsdfjghjkldf shgjkdfsh gjkfsdh kjghdfsj ghklhdf skjhgkdfhks jfdsfsdf"
const helpRequest = {
  "image": assets.food,
  "helpRequestDate": "2020-12-12",
  "helpRequestTime": "12:23:02",
  "title": "Help Request Title",
  "helpSeeker": {"displayName": "helpSeeker displayName"},
  "location": "Help Request Location",
  "price": 20,
  "description": description,
  "takenHelpRequest": [
    {"userId": "4", "user": {"displayName": "displayName 4"}},
    {"userId": "3", "user": {"displayName": "displayName 3"}}
  ]
}

const ActivityScreen = () => {
  const [checked, setChecked] = React.useState(helpRequest.takenHelpRequest[0].userId);
  console.log(checked);

  return (
    <View style={styles.container}>
      <FlatList
        data={helpRequest.takenHelpRequest}
        renderItem={({ item }) => <CandidateHelper helper={item} checked={checked} setChecked={setChecked}/>}
        keyExtractor={(item) => item.userId}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: SIZES.base }}
        ListHeaderComponent={() => (
          <>
            <JobCardDetail helpRequest={helpRequest} />
            <View style={{ padding: SIZES.font }}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: SIZES.large,
                  color: COLORS.primary,
                }}
              >
                Matched Candidate Helper 
              </Text>
            </View>
          </>
        )}
        ListFooterComponent={()=> (
          <>
            <View
              style={{
                width: "100%",
                padding: SIZES.base,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <RectButton
                buttonText={"Accept Helper"}
                minWidth={"100%"}
                fontSize={SIZES.font}
                handlePress={() =>
                  {}
                }
              />
            </View>

          </>
        )}
      />
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});