import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Button,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/client";
import { CREATE_HELP_REQUEST } from "../gql/Mutation";

async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

const NewJobScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [token, setToken] = React.useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [scheduledDatetime, setScheduledDatetime] = useState(
    new Date(new Date().toDateString())
  );

  const [createHelpRequest, { data, loading, error }] =
    useMutation(CREATE_HELP_REQUEST);

  // useEffect(() => {
  //   console.log('in');
  //   // if (token !== null) {
  //   //   alert("Please login first");
  //   // } else {
  //   //   createHelpRequest({
  //   //     variables: {
  //   //       title: title,
  //   //       description: description,
  //   //       category: category,
  //   //       scheduledDatetime: scheduledDatetime,
  //   //     },
  //   //   })
  //   //     .then(() => {
  //   //       alert("Create success!");
  //   //     })
  //   //     .catch((e) => {
  //   //       console.error(e);
  //   //       alert("Create fail");
  //   //     });
  //   // }
  // }, [token]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    scheduledDatetime.setDate(date.getDate());
    scheduledDatetime.setMonth(date.getMonth());
    scheduledDatetime.setFullYear(date.getFullYear());
    setScheduledDatetime(scheduledDatetime);
    hideDatePicker();
  };

  const handleTimeConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    // setScheduledDatetime(scheduledDatetime.setTime(date.getTime()));
    scheduledDatetime.setHours(date.getHours());
    scheduledDatetime.setMinutes(date.getMinutes());
    scheduledDatetime.setSeconds(date.getSeconds());
    setScheduledDatetime(scheduledDatetime);
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Create Help Request</Text>
      <ScrollView>
        <Text style={styles.textInputTitle}>Help Request Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={(inputTitle) => setTitle(inputTitle)}
        />
        <Text style={styles.textInputTitle}>Description</Text>
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={(inputDescription) => setDescription(inputDescription)}
        />
        <Text style={styles.textInputTitle}>Category</Text>
        <TextInput
          style={styles.textInput}
          value={category}
          onChangeText={(inputCategory) => setCategory(inputCategory)}
        />
        <Text style={styles.textInputTitle}>Price</Text>
        <TextInput
          style={styles.textInput}
          value={price}
          onChangeText={(inputPrice) => setPrice(parseFloat(inputPrice))}
        />
        <Text style={styles.textInputTitle}>Scheduled Data & Time</Text>
        {/* <TextInput style={styles.textInput} /> */}
        <View style={{ flexDirection: "row" }}>
          <Pressable style={styles.datePicker} onPress={showDatePicker}>
            <Text style={styles.textInput}>
              {scheduledDatetime.toDateString()}
            </Text>
          </Pressable>
          <Pressable style={styles.timePicker} onPress={showTimePicker}>
            <Text style={styles.textInput}>
              {scheduledDatetime.toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Pressable>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          date={scheduledDatetime}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          date={scheduledDatetime}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        <Pressable
          style={styles.submitButton}
          onPress={() => {
            getValueFor('token').then((token)=>{
              if (token) {
                createHelpRequest({
                  variables: {
                    title: title,
                    description: description,
                    category: category,
                    helpRequestDatetime: scheduledDatetime,
                    price: price,
                  },
                })
                  .then(() => {
                    alert("Create success!");
                  })
                  .catch((e) => {
                    console.error(e);
                    alert("Create fail");
                  });
              }
              else {
                alert("Please login first");
              }
            });
            

            // getValueFor("token").then((token) => {
            //   console.log(token ? true : false);
            //   setToken(token);
            // });
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'left',
    padding: 25,
    // justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.regular,
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
  },
  pageTitle: {
    fontFamily: FONTS.bold, 
    fontWeight: "bold",
    fontSize: SIZES.extraLarge,
    color: COLORS.body,
    marginBottom: 15,
    // alignSelf: 'center',
  },
  textInputTitle: {
    // fontWeight: "bold",
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
    color: COLORS.body,
    marginVertical: 10,
  },
  textInput: {
    fontFamily: FONTS.regular,
    padding: 8,
    // fontSize: 18,
    backgroundColor: "#f5f5f5",
    // width
  },
  datePicker: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 16,
    // paddingHorizontal: 32,
    borderRadius: 10,
    padding: 5,
    // elevation: 3,
    backgroundColor: "#f5f5f5",
    marginRight: 5,
  },
  timePicker: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 16,
    // paddingHorizontal: 32,
    borderRadius: 10,
    padding: 5,
    // elevation: 3,
    backgroundColor: "#f5f5f5",
    marginLeft: 5,
  },
  datePickerText: {
    fontFamily: FONTS.regular,
    fontSize: 20,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 3,
    backgroundColor: COLORS.body,
    marginTop: 40,
    marginBottom: 100,
  },
  submitButtonText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.white,
  },
});

export default NewJobScreen;
