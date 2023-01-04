import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { COLORS } from './constants';
import MainNavigator from './src/navigations/MainNavigator';


// entry point
export default function App() {
  
  const [appLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!appLoaded) return null

  return (
    // <SafeAreaView style={styles.container}>
    //   <StatusBar style="auto" />
    //   <MainNavigator/>
    // </SafeAreaView>
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <MainNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  my: {
    flex: 1,
    backgroundColor: '#000',
  }
});
