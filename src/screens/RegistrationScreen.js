import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SHADOWS, SIZES, SPACING } from "../../constants";
import { RoundTextInput } from "../components";
import { RectButton } from "../components/Button";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const registrationScreenConfig = {
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  confirmPasswordPlaceholder: "Confirm Password",
  eamilPlaceholder: "Email",
  nextButtonText: "Next",
  buttonWidth: "50%",
};
const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [birthday, setBirthday] = useState(undefined);
  const [birthdayUTC, setBirthdayUTC] = useState(undefined);
  const [daypickerOpen, setDaypickerOpen] = useState(false);

  // const [scheduledDatetime, setScheduledDatetime] = useState(
  //   new Date(new Date().toDateString())
  // );

  const handleEmailInput = (text) => {
    setEmail(text);
    const regex = /\S+@\S+\.\S+/;
    setIsEmailValid(regex.test(text));
  };

  const onDateConfirmHandler = (date) => {
    setDaypickerOpen(false);
    setBirthdayUTC(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const birthday = `${year}-${month}-${day}`;
    setBirthday(birthday);
  };

  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subTitle}>
              Create an account to get recommended requests !
            </Text>
          </View>
          <ScrollView
            style={[
              styles.scrollView,
              { backgroundColor: theme.colors.accent },
            ]}
          >
            <TextInput
              mode="outlined"
              label={"Username"}
              autoComplete={"username"}
              autoCapitalize={"none"}
              textContentType={"username"}
            />
            <TextInput
              mode="outlined"
              label={"Password"}
              autoComplete={"off"}
              autoCapitalize={"none"}
              secureTextEntry={true}
            />
            <TextInput
              mode="outlined"
              label={"Confirm password"}
              autoComplete={"off"}
              autoCapitalize={"none"}
              secureTextEntry={true}
            />
            <TextInput
              // style={{ marginBottom: 20 }}
              mode="outlined"
              label={"Email"}
              autoComplete={"email"}
              textContentType={"emailAddress"}
              autoCapitaliz={"none"}
              onChangeText={handleEmailInput}
              error={!isEmailValid}
            />
            <HelperText type="error" visible={!isEmailValid}>
              Please enter a valid email address
            </HelperText>
            <TextInput
              mode="outlined"
              label={"Date of Birth (YYYY-MM-DD)"}
              disabled={true}
              value={birthday ? birthday : ""}
              right={
                <TextInput.Icon
                  icon="calendar-today"
                  forceTextInputFocus={false}
                  onPress={() => setDaypickerOpen(true)}
                />
              }
            />
            <DateTimePickerModal
              style={styles.datePicker}
              mode={"date"}
              date={new Date()}
              isVisible={daypickerOpen}
              onConfirm={onDateConfirmHandler}
              onCancel={() => setDaypickerOpen(false)}
            />
            {/* <DatePickerModal
              style={styles.datePicker}
              locale="en"
              date={birthday}
              mode="single"
              visible={daypickerOpen}
              onDismiss={() => setDaypickerOpen(false)}
              onConfirm={onDateConfirmHandler}
              inputEnabled={false}
              label="Select a date"
            /> */}
            <TextInput mode="outlined" label={"test"} placeholder={"HI"} />
            <TextInput mode="outlined" label={"test"} placeholder={"HI"} />
            <TextInput mode="outlined" label={"test"} placeholder={"HI"} />
            <TextInput mode="outlined" label={"test"} placeholder={"HI"} />
            <TextInput mode="outlined" label={"test"} placeholder={"HI"} />
            <TextInput mode="outlined" label={"test"} placeholder={"HI"} />
            <TextInput mode="outlined" label={"test"} placeholder={"HI"} />
            <RoundTextInput
              placeholder={registrationScreenConfig.usernamePlaceholder}
            />
            <RoundTextInput
              placeholder={registrationScreenConfig.passwordPlaceholder}
            />
            <RoundTextInput
              placeholder={registrationScreenConfig.eamilPlaceholder}
            />
            <RoundTextInput
              placeholder={registrationScreenConfig.confirmPasswordPlaceholder}
            />
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <RectButton
            buttonText={registrationScreenConfig.nextButtonText}
            handlePress={() => {
              //post to backend to create an account
              navigation.navigate("Interests");
            }}
            extraContainerStyle={styles.nextButtonExtraStyle}
            extraTextStyle={styles.nextButtonTextExtraStyle}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING * 2,
  },
  scrollView: {
    height: "70%",
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: SPACING * 2,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.gray,
    marginVertical: SPACING * 2,
  },
  subTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginHorizontal: SPACING * 4,
    textAlign: "center",
  },
  datePicker: {
    borderRadius: SPACING * 2,
    backgroundColor: COLORS.error,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  nextButtonExtraStyle: {
    minWidth: registrationScreenConfig.buttonWidth,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    marginVertical: SPACING,
    ...SHADOWS.light,
  },
  nextButtonTextExtraStyle: {
    fontSize: SIZES.large,
  },
});
