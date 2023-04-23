import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  helpRequestsAction: [],
  requests: [],
  myRequests: [],
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
    addRequest: (state, action) => {
      let rawRequestArray = action.payload;
      console.log("push....");
      state.requests.push(...rawRequestArray);
    },
    findAndReplace: (state, action) => {
      let { index, current } = action.payload;
      state.requests[index] = current;
    },
    addMyRequests: (state, action) => {
      state.myRequests = [];
      let rawRequestArray = action.payload;
      console.log("push to my requests....");
      state.myRequests.push(...rawRequestArray);
    },
    // for the purpose of displaying the one that seeker accepted.
    findAndReplaceHelperList: (state, action) => {
      let { oneHelperList, index } = action.payload;
      state.myRequests[index].takenHelpRequests = oneHelperList;
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

export const {
  clearUserAction,
  addUserAction,
  addRequest,
  findAndReplace,
  addMyRequests,
  findAndReplaceHelperList,
} = userActionSlice.actions;

export const selectHelpRequestsAction = (state) =>
  state.userAction.helpRequestsAction;

export const selectRequest = (state, reduxIndex) =>
  state.userAction.requests[reduxIndex];

export const selectMyRequests = (state, reduxIndex) =>
  state.userAction.myRequests[reduxIndex];

export default userActionSlice.reducer;
