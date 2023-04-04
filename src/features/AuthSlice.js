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
  async (_, { thunkAPI }) => {
    try {
      let token = await SecureStore.getItemAsync(tokenName);
      let userInfo = await SecureStore.getItemAsync(userInfoName);
      userInfo = JSON.parse(userInfo);
      return { token, userInfo };
    } catch (error) {
      let fetchTokenErrorMsg = "Fail to fetch user token and info";
      return thunkAPI.rejectWithValue(fetchTokenErrorMsg);
    }
  }
);

export const appLogin = createAsyncThunk(
  "auth/appLogin",
  async ({ loginMutation, navigation, username, password }, thunkAPI) => {
    try {
      let result = await loginMutation({
        variables: { username: username, password: password },
      });

      let user_token = result.data.login.access_token;
      let user_info = result.data.login.user;

      await SecureStore.setItemAsync(tokenName, user_token);
      await SecureStore.setItemAsync(userInfoName, JSON.stringify(user_info));

      if (!user_info.country || !user_info.city || !user_info.address) {
        // navigation.replace("District");
        navigation.reset({ index: 0, routes: [{ name: "Address" }] });
      }
      // else if (!user_info.interests) {
      //   navigation.reset({ index: 0, routes: [{ name: "Interests" }] });
      // }
      else {
        navigation.replace("Root");
      }

      // navigation.replace("Root");

      return { user_token, user_info };
    } catch (error) {
      let loginErrorMsg = "Wrong user name or password, try again.";
      return thunkAPI.rejectWithValue(loginErrorMsg);
    }
  }
);

export const appLogout = createAsyncThunk("auth/appLogout", async () => {
  await SecureStore.deleteItemAsync(tokenName);
  await SecureStore.deleteItemAsync(userInfoName);
  return false;
});

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
        let { token, userInfo } = action.payload;

        if (userInfo && token) {
          state.userToken = token;
          state.userInfo = userInfo;
          state.isLogin = true;
        } else {
          state.userToken = null;
          state.userInfo = null;
          state.isLogin = false;
        }
        state.isLoading = false;
        console.log("🚀 ~ file: checkSignIn.fulfilled ~ action");
      })
      .addCase(checkSignIn.rejected, (state, action) => {
        console.log(`${JSON.stringify(action.payload)}`);
        alert(`${JSON.stringify(action.payload)}`);
        console.log("🚀 ~ file: checkSignIn.rejected ~ action");
      })
      .addCase(appLogin.pending, (state, action) => {
        state.loginIsLoading = true;
        state.loginError = null;
        console.log("🚀 ~ file: appLogin.pending ~ action");
      })
      .addCase(appLogin.fulfilled, (state, action) => {
        let { user_token, user_info } = action.payload;
        state.userToken = user_token;
        state.userInfo = user_info;
        state.isLogin = true;
        state.loginError = null;
        state.loginIsLoading = false;
        console.log("🚀 ~ file: appLogin.fulfilled ~ action");
      })
      .addCase(appLogin.rejected, (state, action) => {
        state.loginError = action.payload;
        state.loginIsLoading = false;
        console.log("🚀 ~ file: appLogin.rejected ~ action");
      })
      .addCase(appLogout.fulfilled, (state, action) => {
        state.userInfo = null;
        state.userToken = null;
        state.isLogin = action.payload;
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
