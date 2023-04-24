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
  Touchable,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES, SPACING } from "../../constants";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, SIGNOUT } from "../gql/Mutation";
import { FocusedStatusBar, RectButton, RoundTextInput } from "../components";
import {
  appLogout,
  appLogin,
  selectIsLogin,
  selectUserInfo,
  selectUserToken,
  selectLoginIsLoading,
  resetLoginState,
  clearUserInfo,
} from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { clearAllRequestsCache } from "../features/UserActionSlice";
import Spinner from "react-native-loading-spinner-overlay/lib";

const SECTIONS = [
  // {
  //   header: "Preferences",
  //   icon: "settings",
  //   items: [
  //     { icon: "globe", color: "#fe9400", label: "Language", type: "link" },
  //     {
  //       id: "darkMode",
  //       icon: "moon",
  //       color: "#007afe",
  //       label: "Dark Mode",
  //       type: "toggle",
  //     },
  //     {
  //       id: "wifi",
  //       icon: "wifi",
  //       color: "#007afe",
  //       label: "Use Wi-FI",
  //       type: "toggle",
  //     },
  //     { icon: "navigation", color: "#32c759", label: "Location", type: "link" },
  //     {
  //       id: "showCollaborators",
  //       icon: "users",
  //       color: "#32c759",
  //       label: "Show Collaborators",
  //       type: "toggle",
  //     },
  //     {
  //       id: "accessibilityMode",
  //       icon: "airplay",
  //       color: "#fd2d54",
  //       label: "Accessibility Mode",
  //       type: "toggle",
  //     },
  //   ],
  // },
  // {
  //   header: "Help",
  //   icon: "help-circle",
  //   items: [
  //     { icon: "flag", color: "#8e8d91", label: "Report Bug", type: "link" },
  //     { icon: "mail", color: "#007afe", label: "Contact Us", type: "link" },
  //   ],
  // },
  // {
  //   header: "Content",
  //   icon: "align-center",
  //   items: [
  //     { icon: "save", color: "#32c759", label: "Saved", type: "link" },
  //     { icon: "download", color: "#fd2d54", label: "Downloads", type: "link" },
  //   ],
  // },
  {
    header: "Account",
    icon: "account",
    items: [
      { icon: "logout", color: "#fd2d54", label: "Logout", type: "link" },
    ],
  },
];

//For your reference https://icons.expo.fyi/ can find more Icon
const IconSelection = (props) => {
  if (props.icon == "wifi" || props.icon == "mail" || props.icon == "logout") {
    return <AntDesign name={props.icon} size={18} color="#fff" />;
  } else if (
    props.icon == "globe" ||
    props.icon == "moon" ||
    props.icon == "users"
  ) {
    return <Entypo name={props.icon} size={18} color="#fff" />;
  } else if (
    props.icon == "navigation" ||
    props.icon == "airplay" ||
    props.icon == "help-circle" ||
    props.icon == "flag" ||
    props.icon == "align-center" ||
    props.icon == "save" ||
    props.icon == "download"
  ) {
    return <Feather name={props.icon} size={18} color="#fff" />;
  }
};

const loginScreenConfig = {
  loginButtonText: "Login",
  logoutButtonText: "Logout",
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
  const [
    signoutMutation,
    {
      loading: signOutLoading,
      error: signOutError,
      data: jobData,
      signOutRefetch,
      signOutCalled,
    },
  ] = useMutation(SIGNOUT);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    darkMode: true,
    wifi: false,
    showCollaborators: true,
    accessibilityMode: false,
  });
  useEffect(() => {
    setUsername("");
    setPassword("");
    dispatch(resetLoginState());
  }, []);

  const handleLogin = () => {
    // dispatch(clearAllRequestsCache());
    dispatch(appLogin({ loginMutation, navigation, username, password }));
  };

  const handleLogout = () => {
    // dispatch(clearAllRequestsCache());
    dispatch(clearUserInfo());
    dispatch(
      appLogout({
        signoutMutation,
        signOutRefetch,
        signOutCalled,
        navigation,
      })
    );
  };

  if (loginIsLoading) {
    // return <Text>loading...</Text>; //while loading return this
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(205, 215, 226, 0.8)",
        }}
      >
        <ActivityIndicator size={"large"} color="#463451" />
      </View>
    );
  }

  if (isLogin) {
    let PROFILE_PIC =
      "https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg";

    if (userInfo) {
      PROFILE_PIC = userInfo.avatar;
    }
    console.log("enter is login");
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={loggedInStyles.container}>
          <View style={loggedInStyles.profile}>
            <TouchableOpacity onPress={() => {}} disabled={true}>
              <View styles={loggedInStyles.profileAvatarWrapper}>
                <Image
                  alt="Profile picture"
                  source={{ uri: PROFILE_PIC }}
                  style={loggedInStyles.profileAvatar}
                />
              </View>

              <View style={loggedInStyles.profileAction}>
                <AntDesign name="edit" size={15} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={loggedInStyles.profileName}>
              {userInfo && userInfo.displayName}
            </Text>
            {/** Street Name */}
            <Text style={loggedInStyles.profileAddress}>
              123 Maple Street, Anytown, 17010
            </Text>
          </View>

          {SECTIONS.map(({ header, items }) => (
            <View style={loggedInStyles.section} key={header}>
              <Text style={loggedInStyles.sectionHeader}>{header}</Text>
              {items.map(({ id, label, type, icon, color }, index) => (
                <TouchableOpacity
                  key={icon}
                  onPress={() => {
                    if (label == "Logout") {
                      return handleLogout();
                    }
                  }}
                >
                  <View style={loggedInStyles.row}>
                    <View
                      style={[
                        loggedInStyles.rowIcon,
                        { backgroundColor: color },
                      ]}
                    >
                      <IconSelection icon={icon} />
                    </View>
                    <Text style={loggedInStyles.rowLabel}>{label}</Text>
                    <View style={{ flex: 1 }} />
                    {type === "toggle" && (
                      <Switch
                        value={form[id]}
                        onValueChange={(value) =>
                          setForm({ ...form, [id]: value })
                        }
                      />
                    )}

                    {type === "link" && (
                      <Feather name="chevron-right" color="#0c0c0c" size={22} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
      // <View style={styles.container}>
      //   <Text style={styles.pageTitle}>
      //     <FocusedStatusBar
      //       barStyle="dark-content"
      //       backgroundColor="transparent"
      //     />
      //     Hi, {userInfo && userInfo.displayName}
      //   </Text>

      //   <RectButton
      //     buttonText={loginScreenConfig.logoutButtonText}
      //     handlePress={() => dispatch(appLogout({ signoutMutation, signOutRefetch, signOutCalled ,navigation }))}
      //     extraContainerStyle={styles.logoutButton}
      //     extraTextStyle={styles.logoutButtonText}
      //   />
      // </View>
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
            handlePress={handleLogin}
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

const loggedInStyles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: COLORS.white,
  },
  profile: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  rowLabel: {
    fontSize: 17,
    color: "#8c8c8c",
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
});

export default LoginScreen;
