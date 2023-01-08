import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import * as SecureStore from "expo-secure-store";
import { setContext } from '@apollo/client/link/context';
import { useContext } from 'react';

export const BASE_URL = 'https://communityhelper.azurewebsites.net/graphql'
export const tokenName = 'token'
export const userInfoName = 'userInfo'
export const getPendingJobsVar = {state: ["pending"]}
