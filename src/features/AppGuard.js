import { useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { checkSignIn, selectIsLoading } from "./AuthSlice";
import { useNavigation } from "@react-navigation/native";

export const AppGuard = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(checkSignIn({ navigation }));
  }, []);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return children;
};
