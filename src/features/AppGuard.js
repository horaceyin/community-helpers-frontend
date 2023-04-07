import { useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { checkSignIn, selectIsLoading } from "./AuthSlice";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/client";
import { ME } from "../gql/Query";

export const AppGuard = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigation = useNavigation();
  const [getMyInfo, getMyInfoResult] = useLazyQuery(ME);

  useEffect(() => {
    dispatch(checkSignIn({ navigation, getMyInfo }));
  }, []);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return children;
};
