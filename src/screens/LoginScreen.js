import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES, SPACING } from "../../constants";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN } from "../gql/Mutation";
import { FocusedStatusBar, RectButton, RoundTextInput } from "../components";
import {
  appLogout,
  appLogin,
  selectIsLogin,
  selectUserInfo,
  selectUserToken,
  selectLoginIsLoading,
  resetLoginState,
} from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const loginScreenConfig = {
  loginButtonText: "Login",
  registerButtonText: "Register",
  buttonWidth: "48%",
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
};

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const userInfo = useSelector(selectUserInfo);
  const userToken = useSelector(selectUserToken);
  const loginIsLoading = useSelector(selectLoginIsLoading);
  const loginError = useSelector((state) => state.auth.loginError);

  const [loginMutation, loginResult] = useMutation(LOGIN);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername("");
    setPassword("");
    dispatch(resetLoginState());
  }, []);

  if (loginIsLoading) {
    // return <Text>loading...</Text>; //while loading return this
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (isLogin) {
    console.log("enter is login");
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          Hi, {userInfo && userInfo.displayName}
        </Text>
        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            dispatch(appLogout());
            navigation.replace("Root");
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View>
          <FocusedStatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>Welcome</Text>
            <Text style={styles.pageSubTitle}>
              Sign in to get recommended requests !
            </Text>
          </View>
          {/* <Text style={styles.textInputTitle}>Username</Text> */}
          <RoundTextInput
            placeholder={loginScreenConfig.usernamePlaceholder}
            value={username}
            onChangeText={(inputUsername) => setUsername(inputUsername)}
          />
          {/* <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={(inputUsername) => setUsername(inputUsername)}
      /> */}
          {/* <Text style={styles.textInputTitle}>Password</Text> */}
          <RoundTextInput
            placeholder={loginScreenConfig.passwordPlaceholder}
            secureTextEntry={true}
            value={password}
            onChangeText={(inputPassword) => setPassword(inputPassword)}
          />
          {/* <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={(inputPassword) => setPassword(inputPassword)}
      /> */}
          <Text style={styles.errorText}>{loginError && loginError}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <RectButton
            buttonText={loginScreenConfig.loginButtonText}
            handlePress={() =>
              dispatch(
                appLogin({ loginMutation, navigation, username, password })
              )
            }
            extraContainerStyle={styles.loginButtonExtraStyle}
            extraTextStyle={styles.loginButtonTextExtraStyle}
          />
          <RectButton
            buttonText={loginScreenConfig.registerButtonText}
            handlePress={() => navigation.navigate("Registration")}
            extraContainerStyle={styles.registerButtonExtraStyle}
            extraTextStyle={styles.registerButtonTextExtraStyle}
          />
        </View>
        {/* <Pressable
        style={styles.loginButton}
        onPress={() => {
          dispatch(appLogin({ loginMutation, navigation, username, password }));
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    padding: SPACING * 2,
  },
  titleContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: SPACING * 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: SPACING * 2,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    // fontWeight: "bold",
    fontSize: SIZES.xxLarge,
    color: COLORS.body,
    marginVertical: SPACING * 2,
    // alignSelf: 'center',
  },
  pageSubTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    paddingHorizontal: SPACING * 4,
    textAlign: "center",
  },
  text: {
    fontFamily: FONTS.regular,
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
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
    fontSize: SIZES.regular,
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.error,
  },
  loginButtonExtraStyle: {
    minWidth: loginScreenConfig.buttonWidth,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING,
    ...SHADOWS.dark,
  },
  loginButtonTextExtraStyle: {
    fontSize: SIZES.large,
  },
  registerButtonExtraStyle: {
    minWidth: loginScreenConfig.buttonWidth,
    backgroundColor: COLORS.bg,
    borderRadius: SPACING,
  },
  registerButtonTextExtraStyle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 3,
    backgroundColor: COLORS.body,
    marginTop: 40,
    marginBottom: 20,
  },
  loginButtonText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
    fontSize: 20,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: "white",
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    // elevation: 3,
    backgroundColor: "red",
    marginTop: 40,
    marginBottom: 100,
  },
  logoutButtonText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
    fontSize: 20,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: "white",
  },
});

export default LoginScreen;
