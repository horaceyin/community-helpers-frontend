import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { useLazyQuery} from "@apollo/client";
import { FIND_MATCH_BY_STATE, FIND_HELP_REQUESTS_CREATED_BY_ME } from '../gql/Query';
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { MyJobCard } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import { MyJobScreen, MyRequestsScreen } from "./";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  selectIsLogin,
  selectUserToken,
  setIsFetching,
} from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";


// async function getValueFor(key) {
//   return await SecureStore.getItemAsync(key);
// }

// async function deleteValueFor(key) {
//   return await SecureStore.deleteItemAsync(key);
// }

const Tab = createMaterialTopTabNavigator();

const MyActivityScreen = () => {
  const isLogin = useSelector(selectIsLogin);
  console.log("isLogin: "+isLogin);
  
  // const isFocused = useIsFocused();
  // const [
  //   getMyJob, 
  //   { loading: jobLoading, error: jobError, data: jobData, refetch, called}
  // ] = useLazyQuery(FIND_MATCH_BY_STATE);

  // const [
  //   getMyRequest, 
  //   { loading: myRequestLoading, error: myRequestError, data: myRequestData, refetchMyRequest, calledMyRequest}
  // ] = useLazyQuery(FIND_HELP_REQUESTS_CREATED_BY_ME);

  // // const [isLogin, setIsLogin] = useState(false);
  // const [loadingToken, setLoadingToken] = useState(true);
  // const [refresh, setRefresh] = useState(false)
  
  // const pull = async () =>{
  //   setRefresh(true)

  //   console.log("called")    

  //   refetch()
  //   setTimeout(()=>{
  //     setRefresh(false)
  //   }, 1000)
  // }

  // useEffect(()=>{
  //   const getToken = async () => {
  //     const token = await getValueFor("token");
  //     if (token !== null) {
  //       console.log("called")
  //       if(called){
  //         refetch()
  //       }else{
  //         getMyJob({variables: {state: ["pending", "ongoing", "done"]}});
  //         getMyRequest();
  //       }
  //       // setIsLogin(true);
  //     }
  //     setLoadingToken(false);
  //   };

  //   if(isFocused){ 
  //     getToken()
  //   }
  // }, [isFocused, called]);

  // if (loadingToken) {
  //   return <Text>loading token</Text>;
  // }

  if(isLogin){
    // if(jobLoading || myRequestLoading){
    //   return <Text>loading Activity</Text>;
    // }

    // if(jobError || myRequestError) {
    //   return (
    //     <View style={styles.viewContainer}>
    //       <Text style={styles.pageTitle}>
    //         My Activity
    //       </Text>
    //       <Text style={styles.pageContent}>
    //         Login in to see your Activity
    //       </Text>
    //     </View>
    //   );
    // }

    // console.log("myRequestData: ");
    // console.log(myRequestData);

    return (
      <View style={{ height: "100%" }}>
        <Text style={styles.pageTitle}>
          My Activity
        </Text>
        <Tab.Navigator 
          screenOptions={{
            tabBarPosition: 'top',
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.body,
              height : 3  
            },
            tabBarLabelStyle: {
              fontWeight: '200',
              fontFamily: FONTS.bold,
            },
          }}
        >
          <Tab.Screen name="My Jobs" component={MyJobScreen} />
          <Tab.Screen name="My Requests" component={MyRequestsScreen} />
        </Tab.Navigator>
      </View>

      // <View style={styles.viewContainer}>
      //   <Text style={styles.pageTitle}>
      //     My Jobs
      //   </Text>
      //   <FlatList
      //     data={jobData["findByUserAndState"]}
      //     renderItem={({item}) => <MyJobCard data={item}/>}
      //     keyExtractor={item => item.helpRequestId}
      //     onRefresh={() => pull()}
      //     refreshing={refresh}/>
      // </View>
      ) 
      
  }
  else {
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
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
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
    padding: 15,
    backgroundColor: COLORS.white,
  },
  pageContent: {
    fontFamily: FONTS.bold,
    fontSize: 25,
    color: COLORS.gray,
    marginTop: 50,
    alignSelf: "center"
  },
});

export default MyActivityScreen