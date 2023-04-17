import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { useLazyQuery} from "@apollo/client";
import { FIND_MATCH_BY_STATE, FIND_HELP_REQUESTS_CREATED_BY_ME } from '../gql/Query';
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { MyJobCard } from '../components';
import { ActivityIndicator, Colors } from 'react-native-paper';
import {
  selectIsLogin,
  selectUserToken,
  setIsFetching,
} from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";


async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteValueFor(key) {
  return await SecureStore.deleteItemAsync(key);
}

const MyJobScreen = () => {
  const isLogin = useSelector(selectIsLogin);
  console.log("isLogin: "+isLogin);
  
  const isFocused = useIsFocused();
  const [
    getMyJob, 
    { loading: jobLoading, error: jobError, data: jobData, refetch, called}
  ] = useLazyQuery(FIND_MATCH_BY_STATE);

  // const [isLogin, setIsLogin] = useState(false);
  const [loadingToken, setLoadingToken] = useState(true);
  const [refresh, setRefresh] = useState(false)
  
  const pull = async () =>{
    setRefresh(true)

    console.log("called")    

    refetch()
    setTimeout(()=>{
      setRefresh(false)
    }, 1000)
  }

  useEffect(()=>{
    const getToken = async () => {
      const token = await getValueFor("token");
      if (token !== null) {
        console.log("called")
        if(called){
          refetch()
        }else{
          getMyJob({variables: {state: ["pending", "ongoing", "done"]}});
        }
        // setIsLogin(true);
      }
      setLoadingToken(false);
    };

    if(isFocused){ 
      getToken()
    }
  }, [isFocused, called]);

  if (loadingToken) {
    return (
      <ScrollView
      style={{backgroundColor: COLORS.white,}}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={true} />
      }></ScrollView>
    )
  }

  if(isLogin){
    if(jobLoading){
      return (
        <ScrollView
        style={{backgroundColor: COLORS.white,}}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={true} />
        }></ScrollView>
      )
    }

    if(jobError) {
      return (
        <View style={styles.viewContainer}>
          <Text style={styles.pageTitle}>
            My Activity
          </Text>
          <Text style={styles.pageContent}>
            Login in to see your Activity
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.viewContainer}>
        <FlatList
          data={jobData["findByUserAndState"]}
          renderItem={({item}) => <MyJobCard data={item}/>}
          keyExtractor={item => item.helpRequestId}
          onRefresh={() => pull()}
          refreshing={refresh}/>
      </View>
      ) 
      
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.body,
    marginBottom: 15,
  },
  pageContent: {
    fontFamily: FONTS.bold,
    fontSize: 25,
    color: COLORS.gray,
    marginTop: 50,
    alignSelf: "center"
  },
});

export default MyJobScreen