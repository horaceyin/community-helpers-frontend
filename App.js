import { useFonts } from "expo-font";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { COLORS } from "./constants";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import MainNavigator from "./src/navigations/MainNavigator";
import * as SecureStore from "expo-secure-store";
import { AppProvider } from './AppContext';
import { BASE_URL, tokenName } from './config';
import { store } from './src/store';
import { Provider } from 'react-redux';
import { AppGuard } from './src/features/AppGuard';
import { useEffect, useState, useRef } from 'react';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import * as Device from 'expo-device'
import * as Notifications from "expo-notifications"
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const httpLink = createHttpLink({
  uri: BASE_URL,
  // uri: 'http://192.168.0.169:3000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync(tokenName);
  //console.log(`authLink: ${token}`);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'https://communityhelper.azurewebsites.net/graphql',
  // uri: 'http://192.168.0.169:3000/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("This is the token: " + token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

// entry point
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1999",
      accent: "#f1c40f",
      background: "#f2eded",
    },
    roundness: 10,
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        fontFamily: "Roboto-Regular",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "Roboto-Medium",
        fontWeight: "normal",
      },
    },
    animation: {
      scale: 1.0,
    },
    dark: true,
  };

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  const [appLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!appLoaded) return null;

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <AppGuard>
            <View style={styles.container}>
              {/* <StatusBar style="auto" /> */}
              <MainNavigator />
            </View>
          </AppGuard>
        </Provider>
      </PaperProvider>
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
    backgroundColor: "#000",
  },
});
