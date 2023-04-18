import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import userActionSlice from "./features/UserActionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userAction: userActionSlice,
  },
});
console.log("store.js loaded");
