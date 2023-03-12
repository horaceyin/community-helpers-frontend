import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { COLORS } from './constants';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import MainNavigator from './src/navigations/MainNavigator';
import * as SecureStore from "expo-secure-store";
import { AppProvider } from './AppContext';
import { BASE_URL, tokenName } from './config';

import { store } from './src/store';
import { Provider } from 'react-redux';

const httpLink = createHttpLink({
  uri: BASE_URL,
  // uri: 'http://192.168.0.169:3000/graphql',
});

const authLink =  setContext( async (_, { headers }) => {
  const token = await SecureStore.getItemAsync(tokenName);
  //console.log(`authLink: ${token}`);
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
      }
  }
});

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'https://communityhelper.azurewebsites.net/graphql',
  // uri: 'http://192.168.0.169:3000/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}> 
    <Provider store={store}>
    <AppProvider>
        <View style={styles.container}>
          {/* <StatusBar style="auto" /> */}
          <MainNavigator/>
        </View>
    </AppProvider>
    </Provider>
    </ApolloProvider>
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
