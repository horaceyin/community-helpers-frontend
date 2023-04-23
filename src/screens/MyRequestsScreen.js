import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, assets } from "../../constants";
import { useLazyQuery } from "@apollo/client";
import {
  FIND_MATCH_BY_STATE,
  FIND_HELP_REQUESTS_CREATED_BY_ME,
} from "../gql/Query";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { MyJobCard, MyRequestCard } from "../components";
import {
  selectIsLogin,
  selectUserToken,
  setIsFetching,
} from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { createRenderDataArray } from "../../utilities";
import { addMyRequests, addRequest } from "../features/UserActionSlice";

const randomPics = [
  assets.english,
  assets.fixItem,
  assets.food,
  assets.myImages,
  assets.tv,
];

async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

async function deleteValueFor(key) {
  return await SecureStore.deleteItemAsync(key);
}

const MyRequestsScreen = ({ navigation }) => {
  const isLogin = useSelector(selectIsLogin);
  const [retData, setRetData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [
    getMyRequest,
    {
      loading: myRequestLoading,
      error: myRequestError,
      data: myRequestData,
      refetch: refetchMyRequest,
      calledMyRequest,
    },
  ] = useLazyQuery(FIND_HELP_REQUESTS_CREATED_BY_ME);

  // const [isLogin, setIsLogin] = useState(false);
  // const [loadingToken, setLoadingToken] = useState(true);

  const [refresh, setRefresh] = useState(true);

  const pull = async () => {
    setRefresh(true);

    console.log("calledMyRequest");

    refetchMyRequest();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const handleOnComplete = async (myRequestArray) => {
    if (myRequestArray.length === 0) {
      setRetData([]);
      return;
    } else {
      let retDataArray = await createRenderDataArray(
        myRequestArray,
        true,
        randomPics,
        0
      );
      dispatch(addMyRequests(retDataArray));
      setRetData(retDataArray);
    }
    setRefresh(false);
  };

  useEffect(() => {
    const fetchMyRequests = async () => {
      if (calledMyRequest) {
        let result = await refetchMyRequest();
        if (!result.error) {
          handleOnComplete(result.data.me.userCreatedHelpRequests);
        } else {
          alert(
            `Something went wrong, please try again later.\n Error message: ${result.error.message}`
          );
        }
      } else {
        let result = await getMyRequest();
        if (!result.error) {
          handleOnComplete(result.data.me.userCreatedHelpRequests);
        } else {
          alert(
            `Something went wrong, please try again later.\n Error message: ${result.error.message}`
          );
        }
      }
    };

    if (isFocused) {
      fetchMyRequests();
      console.log("I am focused");
    }
  }, [isFocused]);

  // if (loadingToken) {
  //   return (
  //     <ScrollView
  //       style={{ backgroundColor: COLORS.white }}
  //       contentContainerStyle={styles.scrollView}
  //       refreshControl={<RefreshControl refreshing={true} />}
  //     ></ScrollView>
  //   );
  // }

  // it says that fetching the data
  if (refresh) {
    return (
      <ScrollView
        style={{ backgroundColor: COLORS.white }}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={true} />}
      ></ScrollView>
    );
  }

  //show error if there is an error
  if (myRequestError) {
    return (
      <View style={styles.viewContainer}>
        <Text style={styles.pageTitle}>My Activity</Text>
        <Text style={styles.pageContent}>Login in to see your Activity</Text>
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <FlatList
        // data={myRequestData["me"]["userCreatedHelpRequests"]}
        data={retData}
        renderItem={({ item, index }) => (
          <MyRequestCard
            // data={item}
            navigation={navigation}
            reduxIndex={index}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={() => pull()}
        refreshing={refresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
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
    alignSelf: "center",
  },
});

export default MyRequestsScreen;
