import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN } from "../gql/Mutation";
import { FocusedStatusBar } from "../components";
import { appLogout, appLogin, selectIsLogin, selectUserInfo, selectUserToken, selectLoginIsLoading, resetLoginState } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = ({navigation, route}) => {

  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const userInfo = useSelector(selectUserInfo);
  const userToken = useSelector(selectUserToken);
  const loginIsLoading = useSelector(selectLoginIsLoading);
  const loginError = useSelector(state => state.auth.loginError);

  const [loginMutation, loginResult] = useMutation(LOGIN);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setUsername('');
    setPassword('');
    dispatch(resetLoginState());
  }, [])

  if (loginIsLoading) {
    // return <Text>loading...</Text>; //while loading return this
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  if (isLogin) {
    console.log("enter is login");
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          <FocusedStatusBar barStyle='dark-content' backgroundColor='transparent' />
          Hi, {userInfo && userInfo.displayName}
        </Text>
        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            dispatch(appLogout());
            navigation.replace('Root');
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FocusedStatusBar barStyle='dark-content' backgroundColor='transparent' />
      <Text style={styles.pageTitle}>Login</Text>
      <Text style={styles.textInputTitle}>Username</Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={(inputUsername) => setUsername(inputUsername)}
      />
      <Text style={styles.textInputTitle}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={(inputPassword) => setPassword(inputPassword)}
      />
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          dispatch(appLogin({loginMutation, navigation, username, password}));
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      <Text style={styles.errorText}>{loginError && loginError}</Text>
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
  pageTitle: {
    fontFamily: FONTS.bold,
    // fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
    marginBottom: 15,
    // alignSelf: 'center',
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
    // width
  },
  errorText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.error
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
