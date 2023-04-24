import { useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSignIn,
  selectIsLoading,
  selectLoginIsLoading,
} from "./AuthSlice";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/client";
import { ME } from "../gql/Query";
import { useTheme } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { FONTS } from "../../constants";

export const AppGuard = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const loginIsLoading = useSelector(selectLoginIsLoading);
  const navigation = useNavigation();
  const [getMyInfo, getMyInfoResult] = useLazyQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    dispatch(checkSignIn({ navigation, getMyInfo }));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.appBar,
    },
  });

  if (isLoading || loginIsLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="#463451" />
      </View>
    );

  return children;
};
