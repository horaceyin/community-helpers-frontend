
import * as SecureStore from "expo-secure-store";
import { tokenName, userInfoName } from '../../config';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../gql/Mutation";


const initialState = {
    isLogin: false,
    userToken: null,
    userInfo: null,

    isLoading: false,
    isFetching: false
};

export const checkSignIn = createAsyncThunk(
    'auth/checkSignIn',
    async (_, {dispatch, getState}) => {
        console.log("$#$$#$#$#$#$#")
        let token = await SecureStore.getItemAsync(tokenName);
        let userInfo = await SecureStore.getItemAsync(userInfoName);
        return {token, userInfo};
    }
);

const [loginMutation, { data, loading: loginLoading, error }] = useMutation(LOGIN);

export const appLogin = createAsyncThunk(
    'auth/appLogin',
    async ({ username, password }, {dispatch, getState}) => {
        try{
            let result = await loginMutation({
                variables: {username: username, password: password}
            });

            let user_token = result.data.login.access_token;
            let user_info = result.data.login.user;

            await SecureStore.setItemAsync(tokenName, user_token)
            await SecureStore.setItemAsync(userInfoName, JSON.stringify(user_info))
            return true;

        }catch(e){
            console.log(`Login error: ${e}`);
        }
        
        console.log(username, password, "-==-=-=-=-=-=")
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
        // setIsLogin: (state, action) => {
        //     state.isLogin = action.payload;
        // }
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
                state.isLoading = false
                console.log(token, userInfo, "FFFFFFFF");
            })
            .addCase(checkSignIn.rejected, (state, action) => {
                console.log(`Fetch user token and info error: ${action.error}`);
            })
            .addCase(appLogin.fulfilled, (state, action) => {
                state.userToken = user_token;
                state.userInfo = user_info;
                state.isLogin = action.payload;
            })
            .addCase(appLogout.fulfilled, (state, action) => {
                console.log("1111111111")
                state.userInfo = null;
                state.userToken = null;
                state.isLogin = action.payload;
            });
    }
});

export const selectIsLogin = state => state.auth.isLogin;

export const selectUserToken = state => state.auth.userToken;

export const selectUserInfo = state => state.auth.userInfo;

export default authSlice.reducer;