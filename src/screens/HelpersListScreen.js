import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { useLazyQuery} from "@apollo/client";
import { FIND_MATCH_BY_STATE} from '../gql/Query';
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { MyJobCard } from '../components';

async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteValueFor(key) {
  return await SecureStore.deleteItemAsync(key);
}

const HelpersListScreen = () => {

  const isFocused = useIsFocused();
  const [getMyJob, { loading: jobLoading, error: jobError, data: jobData, refetch, called}] = useLazyQuery(FIND_MATCH_BY_STATE);
  const [isLogin, setIsLogin] = useState(false);
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
          getMyJob({variables: {state: ["ongoing", "done"]}});
        }
        setIsLogin(true);
      }
      setLoadingToken(false);
    };

    if(isFocused){ 
      getToken()
    }
  }, [isFocused, called]);

  if (loadingToken) {
    return <Text>loading token</Text>;
  }

  if(isLogin){
    if(jobLoading){
      return <Text>loading job</Text>;
    }

    if(jobError) {
      return (
        <View style={styles.viewContainer}>
          <Text style={styles.pageTitle}>
            My Jobs
          </Text>
          <Text style={styles.pageContent}>
            Login in to see your job
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.viewContainer}>
        <Text style={styles.pageTitle}>
          My Jobs
        </Text>
        <FlatList
          data={jobData["findByUserAndState"]}
          renderItem={({item}) => <MyJobCard data={item}/>}
          keyExtractor={item => item.id}
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

export default HelpersListScreen