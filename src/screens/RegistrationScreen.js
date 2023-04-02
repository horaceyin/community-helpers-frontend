import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SHADOWS, SIZES, SPACING } from "../../constants";
import { RoundTextInput } from "../components";
import { RectButton } from "../components/Button";
import {
  TextInput,
  HelperText,
  useTheme,
  RadioButton,
  IconButton,
  Text,
} from "react-native-paper";
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
  const [username, setUsername] = useState(undefined);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isUsernameFormatValid, setIsUsernameFormatValid] = useState(true);

  const [password, setPassword] = useState(undefined);
  const [isPasswordFormatValid, setIsPasswordFormatValid] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [isConfirmPasswordMatch, setIsConfirmPasswordMatch] =
    useState(undefined);

  const [email, setEmail] = useState(undefined);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);

  const [birthday, setBirthday] = useState(undefined);
  const [birthdayUTC, setBirthdayUTC] = useState(undefined);

  const [tel, setTel] = useState(undefined);
  const [isTelValid, setIsTelValid] = useState(true);

  const [daypickerOpen, setDaypickerOpen] = useState(false);

  const [gender, setGender] = useState("male");

  const [displayName, setDisplayName] = useState(undefined);

  const handleUsernameInput = (text) => {
    setUsername(text);
    const regex = /^[a-zA-Z0-9]+$/;
    setIsUsernameFormatValid(regex.test(text));

    if (text === "") {
      setUsername(undefined);
      setIsUsernameFormatValid(true);
      setIsUsernameValid(true);
    }

    //to do: send https
    //http to backend to check if username exists
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    // if (text === "" || (text === "" && confirmPassword === "")) {
    if (text === "") {
      setPassword(undefined);
      setIsPasswordFormatValid(true);
    } else {
      setIsPasswordFormatValid(regex.test(text));
    }

    if (
      text === confirmPassword ||
      (text === "" && confirmPassword === undefined)
    ) {
      setIsConfirmPasswordMatch(true);
    } else {
      setIsConfirmPasswordMatch(false);
    }
  };

  const handleConfirmPasswordInput = (text) => {
    setConfirmPassword(text);
    if (text === "") {
      setConfirmPassword(undefined);
    }
    // if (text === password || (text === "" && password === "")) {
    if (text === password || (text === "" && password === undefined)) {
      setIsConfirmPasswordMatch(true);
    } else {
      setIsConfirmPasswordMatch(false);
    }
  };

  const handleEmailInput = (text) => {
    setEmail(text);
    const regex = /\S+@\S+\.\S+/;
    setIsEmailFormatValid(regex.test(text));

    if (text === "") {
      setEmail(undefined);
      setIsEmailFormatValid(true);
      setIsEmailValid(true);
    }

    //to do: send https
    //http to backend to check if email exists
  };

  const handleTelInput = (text) => {
    setTel(text);
    const regex = /^\d{8}$/;
    setIsTelValid(regex.test(text));

    if (text === "") {
      setTel(undefined);
      setIsTelValid(true);
    }
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

  const handleDisplayNameInput = (text) => {
    setDisplayName(text);
    if (text === "") {
      setDisplayName(undefined);
    }
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
              // { backgroundColor: theme.colors.accent },
            ]}
          >
            <TextInput
              mode="outlined"
              label={"Username"}
              autoComplete={"username"}
              autoCapitalize={"none"}
              textContentType={"username"}
              // value={username}
              onChangeText={handleUsernameInput}
              error={
                username === "" || !isUsernameValid || !isUsernameFormatValid
              }
            />
            <HelperText
              type="error"
              visible={!username || !isUsernameValid || !isUsernameFormatValid}
            >
              {!isUsernameFormatValid &&
                "Username can only contain letters and numbers"}
              {!isUsernameValid && "Username already exists"}
              {username === "" && "Please enter a username"}
            </HelperText>
            <TextInput
              mode="outlined"
              label={"Password"}
              autoComplete={"off"}
              autoCapitalize={"none"}
              secureTextEntry={true}
              onChangeText={handlePasswordInput}
              error={password === "" || !isPasswordFormatValid}
            />
            <HelperText
              type="error"
              visible={!password || !isPasswordFormatValid}
            >
              {!isPasswordFormatValid &&
                "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter and one number"}
              {password === "" && "Please enter a password"}
            </HelperText>
            <TextInput
              mode="outlined"
              label={"Confirm password"}
              autoComplete={"off"}
              autoCapitalize={"none"}
              secureTextEntry={true}
              onChangeText={handleConfirmPasswordInput}
              error={isConfirmPasswordMatch === false}
            />
            <HelperText type="error" visible={isConfirmPasswordMatch === false}>
              {"Passwords do not match"}
            </HelperText>

            <TextInput
              mode="outlined"
              label={"Email"}
              autoComplete={"email"}
              textContentType={"emailAddress"}
              autoCapitaliz={"none"}
              onChangeText={handleEmailInput}
              error={email === "" || !isEmailValid || !isEmailFormatValid}
            />
            <HelperText
              type="error"
              visible={!email || !isEmailValid || !isEmailFormatValid}
            >
              {!isEmailFormatValid && "Please enter a valid email address"}
              {!isEmailValid && "Email already exists"}
              {email === "" && "Please enter an email address"}
            </HelperText>

            <TextInput
              mode="outlined"
              label={"Tel"}
              autoComplete={"tel"}
              textContentType={"telephoneNumber"}
              keyboardType={"phone-pad"}
              onChangeText={handleTelInput}
              error={tel === "" || !isTelValid}
            />
            <HelperText type="error" visible={!tel || !isTelValid}>
              {!isTelValid && "Please enter a valid phone number (8 digits)"}
              {tel === "" && "Please enter a phone number"}
            </HelperText>
            <View>
              <TextInput
                mode="outlined"
                label={"Date of Birth (YYYY-MM-DD)"}
                editable={false}
                value={birthday ? birthday : ""}
                right={
                  <TextInput.Icon
                    icon="calendar-today"
                    forceTextInputFocus={false}
                  />
                }
              />
              <TouchableWithoutFeedback onPress={() => setDaypickerOpen(true)}>
                <View style={styles.overlay} />
              </TouchableWithoutFeedback>
              <DateTimePickerModal
                style={styles.datePicker}
                mode={"date"}
                date={new Date()}
                isVisible={daypickerOpen}
                onConfirm={onDateConfirmHandler}
                onCancel={() => setDaypickerOpen(false)}
              />
            </View>

            <View style={styles.genderContainer}>
              <Text variant="titleMedium">Gender</Text>
              <RadioButton.Group
                value={gender}
                onValueChange={(value) => setGender(value)}
              >
                <View style={styles.RadioButtonGroupContainer}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="male" />
                    {/* <Avatar.Icon icon="gender-male" size={24} /> */}
                    <IconButton
                      icon="gender-male"
                      size={30}
                      mode={"contained"}
                      iconColor={theme.colors.primary}
                      containerColor={theme.colors.background}
                    />
                  </View>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="female" />
                    <IconButton
                      icon="gender-female"
                      size={30}
                      mode={"contained"}
                      iconColor={theme.colors.primary}
                      containerColor={theme.colors.background}
                    />
                  </View>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton value="non-disclosure" />
                    <IconButton
                      icon="close-thick"
                      size={30}
                      mode={"contained"}
                      iconColor={theme.colors.primary}
                      containerColor={theme.colors.background}
                    />
                  </View>
                </View>
              </RadioButton.Group>
            </View>

            <TextInput
              mode="outlined"
              label={"Display name"}
              textContentType={"nickname"}
              onChangeText={handleDisplayNameInput}
              error={displayName === ""}
            />

            <HelperText type="error" visible={!displayName}>
              {displayName === "" && "Please enter a display name"}
            </HelperText>

            {/* <RoundTextInput
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
            /> */}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <RectButton
            buttonText={registrationScreenConfig.nextButtonText}
            handlePress={() => {
              //post to backend to create an account
              console.log(password, confirmPassword, gender);
              // navigation.navigate("Interests");
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  datePicker: {
    borderRadius: SPACING * 2,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  genderContainer: {
    marginVertical: SPACING * 2,
  },
  RadioButtonGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: COLORS.error,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING * 2,
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
