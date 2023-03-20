import { useEffect } from "react"
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { checkSignIn, selectIsLoading } from "./AuthSlice";


export const AppGuard = ({ children }) => {

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  
  useEffect(() => {
    dispatch(checkSignIn());
  }, []);

  if (isLoading) return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
  );

  return (
    children
  );
}