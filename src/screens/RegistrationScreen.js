import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useMutation } from "@apollo/client";
import { SIGN_UP, LOGIN } from "../gql/Mutation";
import { useDispatch, useSelector } from "react-redux";
import { appLogin, selectLoginIsLoading } from "../features/AuthSlice";

const registrationScreenConfig = {
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  confirmPasswordPlaceholder: "Confirm Password",
  eamilPlaceholder: "Email",
  nextButtonText: "Next",
  buttonWidth: "50%",
  activityIndicatorSize: 36,
};
const RegistrationScreen = ({ navigation }) => {
  const [signUpMutation, signUpResult] = useMutation(SIGN_UP);
  const [loginMutation, loginResult] = useMutation(LOGIN);
  const dispatch = useDispatch();
  const loginIsLoading = useSelector(selectLoginIsLoading);
  const theme = useTheme();

  //component state
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

  const [tel, setTel] = useState(undefined);
  const [isTelValid, setIsTelValid] = useState(true);

  const [address, setAddress] = useState("");

  const [birthday, setBirthday] = useState(undefined);
  const [birthdayUTC, setBirthdayUTC] = useState(undefined);

  const [daypickerOpen, setDaypickerOpen] = useState(false);

  const [gender, setGender] = useState("male");

  const [displayName, setDisplayName] = useState(undefined);

  const [allPass, setAllPass] = useState(false);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      username &&
      isUsernameFormatValid &&
      password &&
      isPasswordFormatValid &&
      confirmPassword &&
      isConfirmPasswordMatch &&
      email &&
      isEmailFormatValid &&
      tel &&
      isTelValid &&
      birthday &&
      birthdayUTC &&
      displayName
    ) {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }
  }, [
    username,
    isUsernameFormatValid,
    password,
    isPasswordFormatValid,
    confirmPassword,
    isConfirmPasswordMatch,
    email,
    isEmailFormatValid,
    tel,
    isTelValid,
    birthday,
    birthdayUTC,
    displayName,
  ]);

  const handleUsernameInput = (text) => {
    setUsername(text);
    setIsUsernameValid(true);
    const regex = /^[a-zA-Z0-9_-]+$/;
    setIsUsernameFormatValid(regex.test(text));

    if (text === "") {
      setUsername(undefined);
      setIsUsernameFormatValid(true);
      setIsUsernameValid(true);
    }
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

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
    if (text === password || (text === "" && password === undefined)) {
      setIsConfirmPasswordMatch(true);
    } else {
      setIsConfirmPasswordMatch(false);
    }
  };

  const handleEmailInput = (text) => {
    setEmail(text);
    setIsEmailValid(true);
    const regex = /\S+@\S+\.\S+/;
    setIsEmailFormatValid(regex.test(text));

    if (text === "") {
      setEmail(undefined);
      setIsEmailFormatValid(true);
      setIsEmailValid(true);
    }
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

  const handleAddressInput = (text) => {
    setAddress(text);
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

  const handleNextButtonPress = async () => {
    setNextButtonDisabled(true);
    console.log(
      username,
      password,
      confirmPassword,
      email,
      tel,
      birthday,
      birthdayUTC,
      gender,
      displayName
    );

    console.log(
      isUsernameFormatValid,
      isPasswordFormatValid,
      isConfirmPasswordMatch,
      isEmailFormatValid
    );

    await signUpMutation({
      variables: {
        newUserInput: {
          username: username,
          password: password,
          email: email,
          phone: tel,
          address: address,
          dateOfBirth: birthdayUTC,
          gender: gender,
          displayName: displayName,
          district: null,
          interests: [],
        },
      },
      onError: (error) => {
        setIsUsernameValid(false);
        setNextButtonDisabled(false);
        console.log(`Apollo error: ${error.message}`);
      },
      onCompleted: (data) => {
        dispatch(appLogin({ loginMutation, navigation, username, password }));
      },
    });
  };

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
          <ScrollView style={styles.scrollView}>
            <TextInput
              mode="outlined"
              label={"Username"}
              autoComplete={"username"}
              autoCapitalize={"none"}
              textContentType={"username"}
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

            <TextInput
              mode="outlined"
              label={"Address (Optional)"}
              textContentType={"fullStreetAddress"}
              onChangeText={handleAddressInput}
            />
            <HelperText />

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
          <ActivityIndicator
            animating={signUpResult.loading || loginIsLoading}
            color={MD2Colors.deepOrangeA400}
            size={registrationScreenConfig.activityIndicatorSize}
          />
          <RectButton
            buttonText={registrationScreenConfig.nextButtonText}
            handlePress={() => handleNextButtonPress()}
            extraContainerStyle={styles.nextButtonExtraStyle}
            extraTextStyle={styles.nextButtonTextExtraStyle}
            disabled={nextButtonDisabled}
            RectButtonContainerDisabledStyle={
              styles.nextButtonContainerDisabled
            }
            RectButtonTextDisabled={styles.nextButtonTextDisabled}
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
    marginHorizontal: SPACING * 2,
    marginRight: registrationScreenConfig.activityIndicatorSize + SPACING * 2,
    ...SHADOWS.light,
  },
  nextButtonTextExtraStyle: {
    fontSize: SIZES.large,
  },
  nextButtonContainerDisabled: {
    minWidth: registrationScreenConfig.buttonWidth,
    backgroundColor: MD2Colors.blueGrey500,
    borderRadius: SPACING,
    marginHorizontal: SPACING * 2,
    ...SHADOWS.light,
    opacity: 0.5,
  },
  nextButtonTextDisabled: {
    color: MD2Colors.black,
    fontSize: SIZES.large,
    fontWeight: "bold",
    opacity: 0.5,
  },
});
