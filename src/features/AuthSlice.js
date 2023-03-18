
import * as SecureStore from "expo-secure-store";
import { tokenName, userInfoName } from '../../config';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../gql/Mutation";


const initialState = {
    isLogin: false,
    userToken: null,
    userInfo: null,

    loginIsLoading: false,

    isLoading: true,
    isFetching: false,

    loginError: null
};

export const checkSignIn = createAsyncThunk(
    'auth/checkSignIn',
    async (_, {dispatch, getState}) => {
        console.log("$#$$#$#$#$#$#")
        let token = await SecureStore.getItemAsync(tokenName);
        let userInfo = await SecureStore.getItemAsync(userInfoName);
        userInfo = JSON.parse(userInfo);
        return {token, userInfo};
    }
);

export const appLogin = createAsyncThunk(
    'auth/appLogin',
    async ({ loginMutation, loginResult, username, password }, thunkAPI) => {
        try{
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`")
            let result = await loginMutation({
                variables: {username: username, password: password}
            });

            if(!loginResult.error){
                console.log(loginResult.data, "!@!@!@!@!")
                let user_token = result.data.login.access_token;
                let user_info = result.data.login.user;
    
                await SecureStore.setItemAsync(tokenName, user_token)
                await SecureStore.setItemAsync(userInfoName, JSON.stringify(user_info))
                return {user_token, user_info};
            }
            else{
                thunkAPI.rejectWithValue(loginResult.error);
            }

        }catch(e){
            console.log(`Login error: ${e},,,,,,,,,,,,,,,${loginResult.error}`);
            thunkAPI.rejectWithValue(loginResult.error);
        }
    }
);

export const appLogout = createAsyncThunk(
    'auth/appLogout',
    async () => {
        await SecureStore.deleteItemAsync(tokenName);
        await SecureStore.deleteItemAsync(userInfoName);
        return false;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(checkSignIn.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkSignIn.fulfilled, (state, action) => {
                let {token, userInfo} = action.payload;
                
                if(userInfo && token){
                    state.userToken = token;
                    state.userInfo = userInfo;
                    state.isLogin = true;
                }
                else{
                    state.userToken = null;
                    state.userInfo = null;
                    state.isLogin = false;
                }
                state.isLoading = false;
                console.log(token, userInfo, "FFFFFFFF");
            })
            .addCase(checkSignIn.rejected, (state, action) => {
                console.log(`Fetch user token and info error: ${action.error}`);
            })
            .addCase(appLogin.pending, (state, action) => {
                state.loginIsLoading = true;
            })
            .addCase(appLogin.fulfilled, (state, action) => {
                let {user_token, user_info} = action.payload;
                state.userToken = user_token;
                state.userInfo = user_info;
                state.isLogin = true;
                state.loginIsLoading = false;
            })
            .addCase(appLogin.rejected, (state, action) => {
                state.loginError = action.payload
                console.log("********************************",action.payload.error)
            })
            .addCase(appLogout.fulfilled, (state, action) => {
                state.userInfo = null;
                state.userToken = null;
                state.isLogin = action.payload;
            });
    }
});

export const { setIsFetching } = authSlice.actions; 

export const selectIsLoading = state => state.auth.isLoading;

export const selectIsLogin = state => state.auth.isLogin;

export const selectLoginIsLoading = state => state.auth.loginIsLoading;

export const selectUserToken = state => state.auth.userToken;

export const selectUserInfo = state => state.auth.userInfo;

export default authSlice.reducer;