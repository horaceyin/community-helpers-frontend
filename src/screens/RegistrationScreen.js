import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SHADOWS, SIZES, SPACING } from "../../constants";
import { RoundTextInput } from "../components";
import { RectButton } from "../components/Button";

const registrationScreenConfig = {
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  confirmPasswordPlaceholder: "Confirm Password",
  eamilPlaceholder: "Email",
  nextButtonText: "Next",
  buttonWidth: "48%",
};

const RegistrationScreen = ({ navigation }) => {
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
        </View>
        <View>
          <RectButton
            buttonText={registrationScreenConfig.nextButtonText}
            handlePress={() => {
              //post to backend to create an account
              navigation.push("Interests");
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
    padding: SPACING * 2,
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
  nextButtonExtraStyle: {
    minWidth: registrationScreenConfig.buttonWidth,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    ...SHADOWS.light,
  },
  nextButtonTextExtraStyle: {
    fontSize: SIZES.large,
  },
});
