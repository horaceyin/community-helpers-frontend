import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN } from "../gql/Mutation";
import { ME } from "../gql/Query";
import * as SecureStore from "expo-secure-store";
import { AppContext } from "../../AppContext";
import { FocusedStatusBar } from "../components";
import { appLogout, appLogin, selectIsLogin, selectUserInfo, selectUserToken, selectLoginIsLoading } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

// async function getValueFor(key) {
//   return await SecureStore.getItemAsync(key);
// }

// async function deleteValueFor(key) {
//   return await SecureStore.deleteItemAsync(key);
// }

const LoginScreen = ({navigation, route}) => {

//  const { isLogin, appLogin, loginLoading, appLogout, userToken, userInfo } = useContext(AppContext)
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  const userInfo = useSelector(selectUserInfo);
  const userToken = useSelector(selectUserToken);
  const loginIsLoading = useSelector(selectLoginIsLoading);

  const [loginMutation, loginResult] = useMutation(LOGIN);

  // const { appLogin, loginLoading } = useContext(AppContext);
  
  //const [login, { data, loading, error }] = useMutation(LOGIN);

  //const [getMe, { loading: meLoading, error: meError, data: meData }] = useLazyQuery(ME);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [isLogin, setIsLogin] = useState(false);
  //const [loadingToken, setLoadingToken] = useState(true);

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await getValueFor("token");
  //     if (token !== null) {
  //       getMe();
  //       setIsLogin(true);
  //     }
  //     setLoadingToken(false);
  //   };
  //   getToken();
  // }, []);

  // if (loadingToken) {
  //   return <Text>loading</Text>;
  // }

  // useEffect(() => {

  // }, [isLogin])

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
    // if (meLoading) {
    //   console.log("meLoading");
    //   return <Text>loading</Text>;
    // }
    // if (meError) {
    //   deleteValueFor("token").then(() => {
    //     setIsLogin(false);
    //   });
    //   return <Text>Error! ${meError.message}</Text>;
    // }
    // console.log(meData);
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          <FocusedStatusBar barStyle='dark-content' backgroundColor='transparent' />
          {/* Hi,  */}
          {/* Hi, {loading ? "" : meData.me.username} */}
          Hi, {userInfo && userInfo.displayName}
        </Text>
        <Pressable
          style={styles.logoutButton}
          // onPress={() => {
          //   deleteValueFor("token").then(() => {
          //     setIsLogin(false);
          //   });
          // }}
          onPress={async () => {
            //or sync?? no await ??
            await dispatch(appLogout());
            navigation.replace('Root');
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
        {/* <TouchableOpacity style={styles.loginButton} onPress={navigation.goBack()}>
          <Text style={styles.loginButtonText}>Go Back</Text>
        </TouchableOpacity> */}
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
        // onPress={() => {
        //   console.log(`username: ${username}`);
        //   console.log(`password: ${password}`);
        //   login({
        //     variables: { username: username, password: password },
        //   })
        //     .then((result) => {
        //       console.log(`access_token: ${result.data.login.access_token}`);
        //       saveToken(result.data.login.access_token).then((result) => {
        //         getMe().then((d) => {
        //           console.log(`getMe: ${d.data.me.username}`);
        //           setIsLogin(true);
        //         });
        //         // alert("login success");
        //         // getValueFor('token').then((token)=>{
        //         //   console.log(token);
        //         // });
        //       });
        //     })
        //     .catch((e) => {
        //       console.error(e);
        //       alert("login fail");
        //     });
        // }}
        onPress={() => {
          dispatch(appLogin({loginMutation, loginResult, username, password}));
          //appLogin(username, password)
          //navigation.replace('Root')
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      {/* <Text>My displayName: {userInfo && userInfo.displayName} </Text>
      <Text>My token: {userToken} </Text> */}
    </View>
  );
};

// async function saveToken(token) {
//   await SecureStore.setItemAsync("token", token);
// }

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
  loginButton: {
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
