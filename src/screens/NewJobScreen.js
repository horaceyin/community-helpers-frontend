import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Button,
} from "react-native";
import { COLORS } from '../../constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const NewJobScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [scheduledDatetime, setScheduledDatetime] = useState(
    new Date(new Date().toDateString())
  );

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
        <TextInput style={styles.textInput} />
        <Text style={styles.textInputTitle}>Description</Text>
        <TextInput style={styles.textInput} />
        <Text style={styles.textInputTitle}>Category</Text>
        <TextInput style={styles.textInput} />
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

        <Pressable style={styles.submitButton}>
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
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
    marginBottom: 15,
    // alignSelf: 'center',
  },
  textInputTitle: {
    // fontWeight: "bold",
    fontSize: 20,
    color: COLORS.body,
    marginVertical: 10,
  },
  textInput: {
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
    fontSize: 20,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: "white",
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
    fontSize: 20,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: "white",
  },
});

export default NewJobScreen;
