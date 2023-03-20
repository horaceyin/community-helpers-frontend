import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import { COLORS, FakeData, RecommendedData, assets } from '../../constants';
import { HomeHeader, JobCard } from '../components';
import { useMutation, useLazyQuery } from "@apollo/client";
import { FIND_MATCH_BY_STATE_IN_HOME, FIND_ALL_JOBS_IN_HOME } from '../gql/Query';

import { selectIsLogin, selectUserInfo, selectUserToken } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { createDataArray } from '../../utilities';

//should be fetched the real from backend
const randomPics = [assets.english, assets.fixItem, assets.food, assets.myImages, assets.tv]

const HomeScreen = () => {
  const isLogin = useSelector(selectIsLogin);
  const userToken = useSelector(selectUserToken);
  const userInfo = useSelector(selectUserInfo);

  const [isFetching, setIsFetching] = useState(false);
  const [getRequestsLoading, setGetRequestsLoading] = useState(false);

  const [data, setData] = useState([]);

  const fetchJobOnCompleted = (data, state, jobsPics) => {
    let retData = createDataArray(data, state, jobsPics);
    setData(retData);
    setGetRequestsLoading(false);
  };


  const [getPendingJob, { loading: jobLoading, error: jobError, data: jobData, refetch: pendingJobRefetch, called: pendingJobCalled}] = useLazyQuery(FIND_MATCH_BY_STATE_IN_HOME, {
    onCompleted: (data)=>{
      fetchJobOnCompleted(data.findByUserAndState, true, randomPics);
      // console.log(JSON.stringify(data), "$$$$")
    }
  });

  const [getAllJob, { loading: allJobLoading, error: allJobError, data: allJobData, refetch: allJobRefetch, called: allJobCalled}] = useLazyQuery(FIND_ALL_JOBS_IN_HOME, {
    onCompleted: (data) => {
      fetchJobOnCompleted(data.helpRequests, false, randomPics);
    }
  })

  const getRequests = async () => {
    setData([]);
    setGetRequestsLoading(true);

    if(userToken && userInfo && isLogin) {
      // check if the lazy query called before
      if(pendingJobCalled) {
        let result = await pendingJobRefetch();
        // like onCompleted
        fetchJobOnCompleted(result.data.findByUserAndState, true, randomPics);
      }
      else 
        getPendingJob({variables: {state: ["pending"]}});
    }
    else{
      // check if the lazy query called before
      if(allJobCalled) {
        let result = await allJobRefetch();
        // like onCompleted
        fetchJobOnCompleted(result.data.helpRequests, false, randomPics);
      }
      else 
        getAllJob()
    }
  }

  const onRefresh = () => {
    getRequests();
  }

  useEffect(() => {
    getRequests();
  }, [isLogin, userToken, userInfo])

  useEffect(() => {
    setIsFetching(getRequestsLoading || jobLoading || allJobLoading);
  }, [getRequestsLoading, jobLoading, allJobLoading])

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
          // ListEmptyComponent={ 
          //   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          //     <ActivityIndicator size={'large'}/>
          //   </View>
          //  }
          refreshControl={
            <RefreshControl 
              refreshing={isFetching}
              onRefresh={onRefresh}
              // title="Pull to refresh"
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