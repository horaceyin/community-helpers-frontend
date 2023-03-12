import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import { COLORS, FakeData, RecommendedData, assets } from '../../constants';
import { HomeHeader, JobCard } from '../components';
import * as SecureStore from "expo-secure-store";
import { useMutation, useLazyQuery } from "@apollo/client";
import { AppContext } from '../../AppContext';
import { FIND_MATCH_BY_STATE_IN_HOME, FIND_ALL_JOBS_IN_HOME } from '../gql/Query';
import { getPendingJobsVar } from '../../config';

import { selectIsLogin, selectUserInfo, selectUserToken } from "../features/AuthSlice";
import { useSelector } from "react-redux";


//getPendingJob({variables: {state: ["pending"]}});
const randomPics = [assets.english, assets.fixItem, assets.food, assets.myImages, assets.tv]

const HomeScreen = () => {
  const isLogin = useSelector(selectIsLogin);
  const userToken = useSelector(selectUserToken);
  const userInfo = useSelector(selectUserInfo);

  // const {isLogin, userToken, userInfo, isFetching, setIsFetching} = useContext(AppContext);
  const {isFetching, setIsFetching} = useContext(AppContext);
  const [data, setData] = useState([])

  const createDataArray = (backendData, state) => {
    //console.log(backendData[0].helpRequestMatchings)
    var result = backendData.map(data => {
      var job = null;
      const retJob = {}

      retJob.id = data.id

      if (state) job = data.helpRequest
      else {
        for (var i=0; i < data.helpRequestMatchings.length; i++){
          if (data.helpRequestMatchings[i].state == "ongoing") return null
        }
        job = data
      }

      //retJob.id = job.id
      retJob.image = randomPics[Math.floor(Math.random() * randomPics.length)]
      retJob.description = job.description
      retJob.helpSeeker = job.helpSeeker.displayName
      retJob.location = job.location
      retJob.price = job.price
      retJob.title = job.title
      retJob.categories = job.category.split(",")

      const jobDateAndTime = formatDate(new Date(job.helpRequestDatetime)).split("$")
      retJob.jobsDate = jobDateAndTime[0]
      retJob.jobsTime = jobDateAndTime[1]

      return retJob
    })
    result = result.filter(job => job != null)
    console.log(result, "555")
    return result
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return (
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear()
      ].join('-') +
      '$' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  const [getPendingJob, { loading: jobLoading, error: jobError, data: jobData, refetch: pendingJobRefetch, called: pendingJobCalled}] = useLazyQuery(FIND_MATCH_BY_STATE_IN_HOME, {
    onCompleted: (data)=>{
      let retData = createDataArray(data.findByUserAndState, 1)
      console.log(JSON.stringify(data), "$$$$")
      setData(retData)
    }
  });

  const [getAllJob, { loading: allJobLoading, error: allJobError, data: allJobData, refetch: allJobRefetch, called: allJobCalled}] = useLazyQuery(FIND_ALL_JOBS_IN_HOME, {
    onCompleted: (data) => {
      let retData = createDataArray(data.helpRequests, 0)
      console.log(retData, "&&&&&&&&&&&&&&")
      setData(retData)
    }
  })

  function getUsersPendingJobs() {
    if(userToken && userInfo && isLogin) {
      // check if the lazy query called before
      if(pendingJobCalled){
        pendingJobRefetch()

      }
      else getPendingJob({variables: {state: ["pending"]}})
    }else{
      // check if the lazy query called before
      if(allJobCalled) allJobRefetch()
      else getAllJob()
    }
    setIsFetching(false)
  }
  
  // useEffect(() => {
  //   //console.log("&&&&&&&&&&")
  //   getUsersPendingJobs()
  // }, [isLogin, userToken, userInfo, isFetching])

  useEffect(() => {
    //console.log("&&&&&&&&&&")
    getUsersPendingJobs()
  }, [isLogin, userToken, userInfo])

  return (
    <View style={styles.viewContainer}>
      <View style={styles.flatListContainer}>
        {/* <Text style={{backgroundColor: COLORS.gray}}>{called && !jobLoading? JSON.stringify(data) : "no"}</Text> */}
        {/* <Text style={{backgroundColor: COLORS.gray}}>{isLogin} || {userToken}</Text> */}
        <FlatList
          data={data}
          renderItem={({item}) => <JobCard data={item}/>}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ <HomeHeader /> }
          refreshControl={
            <RefreshControl 
              refreshing={isFetching}
              onRefresh={() => {
                setIsFetching(true)
              }}
              title="Pull to refresh"
              tintColor="#fff"
              titleColor="#fff"
            />
          }
        />
      </View>

      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex:-1}}>
        <View style={{ height: 300, backgroundColor: COLORS.primary}}/>
        <View style={{ flex: 1, backgroundColor: COLORS.white}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.white
    // justifyContent:'center',
    // alignItems:'center'
  },
  flatListContainer: {
    zIndex: 0,
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
  }
});

export default HomeScreen