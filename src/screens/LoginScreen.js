import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../gql/Mutation";
import { ME } from "../gql/Query";
import * as SecureStore from "expo-secure-store";

async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteValueFor(key) {
  return await SecureStore.deleteItemAsync(key);
}

const LoginScreen = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loadingToken, setLoadingToken] = useState(true);
  

  useEffect(()=>{
    const getToken = async () => {
      const token = await getValueFor('token');
      if (token !== null) {
        setIsLogin(true);
      }
      setLoadingToken(false);
    };
    getToken();
  }, []);

  if (loadingToken) {
    return <Text>loading</Text>;
  }

  if (isLogin) {
    // console.log('enter is login');
    
    if (meLoading) return <Text>loading</Text>;
    if (error) return <Text>Error! ${error.message}</Text>;
    // console.log(meData);
    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Hi, {(loading) ? "" : meData.me.username}</Text>
        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            deleteValueFor('token').then(()=>{
              setIsLogin(false);
            });
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
    );
  }

  if (loading) {
    return <Text>loading</Text>; //while loading return this
  }

  return (
    <View style={styles.container}>
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
          console.log(`username: ${username}`);
          console.log(`password: ${password}`);
          login({
            variables: { username: username, password: password },
          })
            .then((result) => {
              console.log(`access_token: ${result.data.login.access_token}`);
              saveToken(result.data.login.access_token).then((result) => {
                setIsLogin(true);
                // alert("login success");
                // getValueFor('token').then((token)=>{
                //   console.log(token);
                // });
              });
            })
            .catch((e) => {
              console.error(e);
              alert("login fail");
            });
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
};

async function saveToken(token) {
  await SecureStore.setItemAsync("token", token);
}

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
    backgroundColor: 'red',
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
