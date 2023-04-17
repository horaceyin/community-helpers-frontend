import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  helpRequestsAction: [],
};

export const userActionSlice = createSlice({
  name: "userAction",
  initialState,
  reducers: {
    collectUserAction: (state, action) => {
      let { userId, helpRequestId, actionType } = action.payload;

      let userAction = {
        userId: userId,
        helpRequestId: helpRequestId,
        actionType: actionType,
      };
      state.helpRequestsAction.push(userAction);
    },

    clearUserAction: (state) => {
      state.helpRequestsAction = [];
    },
  },
});

export const { collectUserAction } = userActionSlice.actions;

export const selectHelpRequestsAction = (state) =>
  state.userAction.helpRequestsAction;

export default userActionSlice.reducer;
