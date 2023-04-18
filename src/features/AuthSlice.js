import * as SecureStore from "expo-secure-store";
import { tokenName, userInfoName } from "../../config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogin: false,
  userToken: null,
  userInfo: null,
  loginIsLoading: false,
  isLoading: true,
  loginError: null,
};

export const checkSignIn = createAsyncThunk(
  "auth/checkSignIn",
  async ({ navigation, getMyInfo }, { thunkAPI }) => {
    let token = await SecureStore.getItemAsync(tokenName);
    // console.log("🚀 ~ file: AuthSlice.js:17 ~ token:", token);
    let userInfo = null;
    let tokenExpiredMsg = "Token expired. Please login again";

    if (token === null) return { token, userInfo };

    await getMyInfo({
      onError: (error) => {
        token = null;
      },
      onCompleted: (result) => {
        userInfo = result.me;
        console.log("🚀 ~ file: AuthSlice.js:29 ~ userInfo:", userInfo);
        if (!userInfo.district) {
          navigation.reset({ index: 0, routes: [{ name: "District" }] });
        } else if (userInfo.interests.length === 0) {
          navigation.reset({ index: 0, routes: [{ name: "Interests" }] });
        }
      },
    });

    if (!token) await SecureStore.deleteItemAsync(tokenName);

    return { token, userInfo, tokenExpiredMsg };
  }
);

export const appLogin = createAsyncThunk(
  "auth/appLogin",
  async ({ loginMutation, navigation, username, password }, thunkAPI) => {
    let user_token = null;
    let loginErrorMsg = "Wrong user name or password, try again.";

    let expoToken = await SecureStore.getItemAsync("expoToken");

    if (!expoToken) {
      expoToken = null;
    }

    await loginMutation({
      variables: {
        username: username,
        password: password,
        expoPushToken: expoToken,
      },
      onError: (error) => {
        console.log(`Apollo error: ${error.message}`);
      },
      onCompleted: async (result) => {
        user_token = result.login.access_token;
        await SecureStore.setItemAsync(tokenName, user_token);
        await SecureStore.setItemAsync("user_action", "[]");
      },
    });

    if (user_token) {
      navigation.reset({ index: 0, routes: [{ name: "Root" }] });
      return { user_token };
    }
    return thunkAPI.rejectWithValue(loginErrorMsg);
  }
);

export const appLogout = createAsyncThunk(
  "auth/appLogout",
  async ({ signoutMutation, signOutRefetch, signOutCalled, navigation }) => {
    let expoToken = await SecureStore.getItemAsync("expoToken");

    if (expoToken) {
      if (signOutCalled) {
        signOutRefetch();
      } else {
        await signoutMutation({
          variables: {
            expoPushToken: expoToken,
          },
          onError: (error) => {
            console.log("bye");
            console.log(`Apollo error: ${error.message}`);
          },
          onCompleted: async (result) => {
            console.log("hello");
            await SecureStore.deleteItemAsync(tokenName);
            await SecureStore.deleteItemAsync("expoToken");
          },
        });
      }
    } else {
      // for not a real device
      await SecureStore.deleteItemAsync(tokenName);
    }

    await SecureStore.deleteItemAsync("user_action");
    console.log("logout");
    navigation.reset({ index: 0, routes: [{ name: "Root" }] });
    return false;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loginError = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkSignIn.pending, (state, action) => {
        state.isLoading = true;
        console.log("🚀 ~ file: checkSignIn.pending ~ action");
      })
      .addCase(checkSignIn.fulfilled, (state, action) => {
        let { token, userInfo, tokenExpiredMsg } = action.payload;

        if (userInfo && token) {
          state.userToken = token;
          state.userInfo = userInfo;
          state.isLogin = true;
        } else {
          if (tokenExpiredMsg) alert(tokenExpiredMsg);
          state.userToken = token;
          state.userInfo = userInfo;
          state.isLogin = false;
        }
        state.isLoading = false;
        console.log("🚀 ~ file: checkSignIn.fulfilled ~ action");
      })
      // .addCase(checkSignIn.rejected, (state, action) => {
      //   // action.payload = "Fail to fetch user token and info"
      //   console.log(`${JSON.stringify(action.error.message)}`);
      //   alert(`${JSON.stringify(action.error.message)}`);
      //   console.log("🚀 ~ file: checkSignIn.rejected ~ action");
      // })
      .addCase(appLogin.pending, (state, action) => {
        state.loginIsLoading = true;
        state.loginError = null;
        console.log("🚀 ~ file: appLogin.pending ~ action");
      })
      .addCase(appLogin.fulfilled, (state, action) => {
        // let { user_token, user_info } = action.payload;
        let { user_token } = action.payload;
        state.userToken = user_token;
        state.userInfo = null;
        state.loginError = null;
        state.loginIsLoading = false;
        console.log("🚀 ~ file: appLogin.fulfilled ~ action");
      })
      .addCase(appLogin.rejected, (state, action) => {
        state.loginError = action.payload;
        state.loginIsLoading = false;
        console.log("🚀 ~ file: appLogin.rejected ~ action");
      })
      .addCase(appLogout.pending, (state, action) => {
        console.log("🚀 ~ file: appLogout.pending ~ action");
      })
      .addCase(appLogout.rejected, (state, action) => {
        console.log("🚀 ~ file: appLogout.rejected ~ action");
      })
      .addCase(appLogout.fulfilled, (state, action) => {
        state.userInfo = null;
        state.userToken = null;
        state.isLogin = action.payload;
        console.log("🚀 ~ file: appLogout.fulfilled ~ action");
      });
  },
});

export const { resetLoginState } = authSlice.actions;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectIsLogin = (state) => state.auth.isLogin;

export const selectLoginIsLoading = (state) => state.auth.loginIsLoading;

export const selectUserToken = (state) => state.auth.userToken;

export const selectUserInfo = (state) => state.auth.userInfo;

export default authSlice.reducer;
console.log("authSlice.reducer");
