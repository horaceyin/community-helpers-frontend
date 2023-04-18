import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  helpRequestsAction: [],
  // currentSetLike: null,
  // currentSetDislike: null,
};

export const sendCookie = createAsyncThunk(
  "userAction/sendCookie",
  async ({ getMyInfo }, { thunkAPI }) => {
    await getMyInfo({
      onCompleted: (result) => {
        console.log("send cookie completed");
        // thunkAPI.dispatch(clearUserAction());
      },
    });
  }
);

export const saveUserAction = createAsyncThunk(
  "userAction/saveUserAction",
  async ({ getMyInfo, userId, helpRequestId, actionType }, { thunkAPI }) => {
    let userAction = {
      userId: userId,
      helpRequestId: helpRequestId,
      actionType: actionType,
    };

    let userActionArray = await SecureStore.getItemAsync("user_action");
    userActionArray = JSON.parse(userActionArray);
    userActionArray.push(userAction);
    console.log(
      "🚀 ~ file: UserActionSlice.js:34 ~ userActionArray:",
      userActionArray
    );
    await SecureStore.setItemAsync(
      "user_action",
      JSON.stringify(userActionArray)
    );
  }
);

export const userActionSlice = createSlice({
  name: "userAction",
  initialState,
  reducers: {
    clearUserAction: (state, action) => {
      state.helpRequestsAction = [];
    },
    addUserAction: (state, action) => {
      state.helpRequestsAction.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveUserAction.pending, (state, action) => {
        console.log("saving user action...");
      })
      .addCase(saveUserAction.fulfilled, (state, action) => {
        console.log("fufilled, saved user action");
      });
  },
});

export const { clearUserAction, addUserAction } = userActionSlice.actions;

export const selectHelpRequestsAction = (state) =>
  state.userAction.helpRequestsAction;

// export const selectSetLike = (state) => state.userAction.currentSetLike;
// export const selectSetDislike = (state) => state.userAction.currentSetDislike;

export default userActionSlice.reducer;
