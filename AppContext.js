import React, { createContext, useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import * as SecureStore from "expo-secure-store";
import { setContext } from '@apollo/client/link/context';
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN } from "./src/gql/Mutation";
import { tokenName, userInfoName } from './config';
import { FakeData } from './constants';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [loginMutation, { data, loading: loginLoading, error }] = useMutation(LOGIN);
  //const [randomRequests, setRandomRequests] = useState(FakeData)
  

  const appLogin = async (username, password) => {
    // make it loading
    loginMutation({
      variables: {username: username, password: password}
    }).then(async (result) => {
      let user_token = result.data.login.access_token
      let user_info = result.data.login.user

      setUserInfo(user_info)
      setUserToken(user_token)

      await SecureStore.setItemAsync(tokenName, user_token)
      await SecureStore.setItemAsync(userInfoName, JSON.stringify(user_info))

      setIsLogin(true)
    }).catch((e) => {
      //console.log(`Error msg: ${e}`)
      alert('login fail')
    })
  }

  const appLogout = async () => {
    setUserToken(null)
    setUserInfo(null)
    await SecureStore.deleteItemAsync(tokenName);
    await SecureStore.deleteItemAsync(userInfoName);
    setIsLogin(false)
    //console.log("kk", userToken, userInfo)
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      let token = await SecureStore.getItemAsync(tokenName);
      let userInfo = await SecureStore.getItemAsync(userInfoName);

      userInfo = JSON.parse(userInfo)
      //console.log(token, userInfo, "$$$$$$$$$$$$$$$")

      if (userInfo && token) {
        setUserToken(token)
        setUserInfo(userInfo)
        setIsLogin(true)
      }
      else{
        setUserToken(null)
        setUserInfo(null)
        setIsLogin(false)
      }
      setIsLoading(false)
    }
    catch(e) {
      console.log(`isLoggedIn msg: ${e}`)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  //children get isLogin, userToken, userInfo
  return (
    <AppContext.Provider value={{ isLogin, appLogin, loginLoading, appLogout, userToken, setUserToken, userInfo, isLoading, isFetching, setIsFetching }}>
      {children}
    </AppContext.Provider>
  )
}