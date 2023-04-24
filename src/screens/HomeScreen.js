import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { COLORS, FakeData, RecommendedData, assets } from "../../constants";
import { HomeHeader, JobCard } from "../components";
import { useMutation, useLazyQuery } from "@apollo/client";
import { FIND_ALL_JOBS_IN_HOME, GET_RECOMMENDED_JOBS } from "../gql/Query";

import {
  selectIsLogin,
  selectUserInfo,
  selectUserToken,
} from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { createRenderDataArray } from "../../utilities";

import { Text } from "react-native-paper";

import uuid from "react-native-uuid";

import { FlashList } from "@shopify/flash-list";
import { addRequest, clearAllRequestsCache } from "../features/UserActionSlice";

//should be fetched the real from backend
const randomPics = [
  assets.english,
  assets.fixItem,
  assets.food,
  assets.myImages,
  assets.tv,
];

const BATCH_NUM = 3;
var requestIndex = 0;

const HomeScreen = () => {
  const isLogin = useSelector(selectIsLogin);
  // const userToken = useSelector(selectUserToken);
  const userInfo = useSelector(selectUserInfo);

  const [isFetching, setIsFetching] = useState(false);
  const [getRequestsLoading, setGetRequestsLoading] = useState(false);

  const [renderData, setRenderData] = useState([]);

  const [skip, setSkip] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isNoMoreRequests, setIsNoMoreRequests] = useState(false);
  const [triggerOnRefresh, setTriggerOnRefresh] = useState(true);

  const dispatch = useDispatch();

  const fetchJobOnCompleted = async (
    helpRequestsArray,
    loginState,
    jobsPics
  ) => {
    if (helpRequestsArray.length === 0) {
      alert("No more jobs");
      setIsNoMoreRequests(true);
      return;
    } else {
      let retDataArray = await createRenderDataArray(
        helpRequestsArray,
        loginState,
        jobsPics,
        requestIndex
      );
      requestIndex += retDataArray.length;
      dispatch(addRequest(retDataArray));
      console.log("fetchJobOnCompleted");
      setRenderData([...renderData, ...retDataArray]);
    }
    setGetRequestsLoading(false);
    // console.log("hi", skip, renderData.length);
  };

  const [
    getRecommenedJobs,
    {
      loading: jobLoading,
      error: jobError,
      data: jobData,
      refetch: getRecommenedJobsRefetch,
      called: getRecommenedJobsCalled,
    },
  ] = useLazyQuery(GET_RECOMMENDED_JOBS, {
    fetchPolicy: "cache-and-network",
  });

  const [
    getAllJob,
    {
      loading: allJobLoading,
      error: allJobError,
      data: allJobData,
      refetch: allJobRefetch,
      called: allJobCalled,
    },
  ] = useLazyQuery(FIND_ALL_JOBS_IN_HOME, {
    fetchPolicy: "cache-and-network",
  });

  const requestServer = async (called, getFucn, refetchFucn, requestParam) => {
    let result;

    // check if the lazy query called before
    if (called) {
      result = await refetchFucn({ ...requestParam });
    } else {
      console.log("not called");
      result = await getFucn({ variables: { ...requestParam } });
    }

    if (result.error) return result;

    //like onCompleted
    if (isLogin) {
      fetchJobOnCompleted(
        result.data.getRecommendedHelpRequests,
        isLogin,
        randomPics
      );
    } else {
      fetchJobOnCompleted(result.data.helpRequests, isLogin, randomPics);
    }
  };

  const getRequests = async () => {
    if (isLogin) {
      let result = await requestServer(
        getRecommenedJobsCalled,
        getRecommenedJobs,
        getRecommenedJobsRefetch,
        { userId: userInfo.id, start: skip, end: skip + BATCH_NUM }
      );

      if (result) {
        alert(
          `Something went wrong, please try again later.\n Error message: ${result.error.message}`
        );
      }
    } else {
      // check if the lazy query called before
      let result = await requestServer(allJobCalled, getAllJob, allJobRefetch, {
        take: BATCH_NUM,
        skip: skip,
      });

      if (result) {
        // console.log(JSON.stringify(result.error, null, 2));
        alert(
          `Something went wrong, please try again later.\n Error message: ${result.error.message}`
        );
      }
    }
  };

  useEffect(() => {
    if (getRequestsLoading) {
      if (renderData.length === 0) {
        setIsFetching(true);
        dispatch(clearAllRequestsCache());
      } else {
        setIsLoadingMore(true);
      }
    } else {
      setTriggerOnRefresh(false);
      setIsFetching(false);
      setIsLoadingMore(false);
    }
  }, [getRequestsLoading]);

  useEffect(() => {
    if (triggerOnRefresh) {
      setGetRequestsLoading(true);
      getRequests();
    }
  }, [triggerOnRefresh]);

  useEffect(() => {
    if (skip !== 0) {
      setGetRequestsLoading(true);
      getRequests();
    }
  }, [skip]);

  const onRefresh = () => {
    setTriggerOnRefresh(true);
    setRenderData([]);
    setIsNoMoreRequests(false);
    setSkip(0);
    console.log("onRefresh");
    console.log("skip", skip, renderData.length);
  };

  const renderFooter = () => {
    if (isNoMoreRequests) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="bodyMedium">
            No more requests, please check back later.
          </Text>
        </View>
      );
    }

    if (isLoadingMore && renderData.length > 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      );
    } else return null;
  };

  const handleLoadMore = () => {
    if (renderData.length > 0) {
      setSkip(skip + BATCH_NUM);
      console.log("handleLoadMore");
    }
  };

  return (
    <View style={styles.viewContainer}>
      {/* <Text style={{ marginTop: 100 }}>{JSON.stringify(test)}</Text> */}
      <View style={styles.flatListContainer}>
        {/* <Text style={{backgroundColor: COLORS.gray}}>{called && !jobLoading? JSON.stringify(data) : "no"}</Text> */}
        {/* <Text style={{backgroundColor: COLORS.gray}}>{isLogin} || {userToken}</Text> */}
        {!isFetching ? (
          <FlashList
            estimatedItemSize={100}
            data={renderData}
            renderItem={({ item, index }) => (
              <JobCard helpRequestData={item} reduxIndex={index} />
            )}
            keyExtractor={(item, index) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader />}
            ListFooterComponent={renderFooter}
            onEndReached={
              !isLoadingMore && !isNoMoreRequests && renderData.length > 0
                ? handleLoadMore
                : null
            }
            onEndReachedThreshold={0.8}
            removeClippedSubviews={true}
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
        ) : (
          <ActivityIndicator size={"large"} />
        )}
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      >
        <View style={{ height: 300, backgroundColor: COLORS.primary }} />
        <View style={{ flex: 1, backgroundColor: "#eaf4f4" }} />
      </View>
    </View>
  );
};

// useEffect(() => {
//   setIsFetching(getRequestsLoading || jobLoading || allJobLoading);
// }, [getRequestsLoading, jobLoading, allJobLoading]);

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    // justifyContent:'center',
    // alignItems:'center'
  },
  flatListContainer: {
    flex: 1,
    zIndex: 0,
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.body,
  },
});

export default HomeScreen;
