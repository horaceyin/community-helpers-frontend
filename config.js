import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import * as SecureStore from "expo-secure-store";
import { setContext } from '@apollo/client/link/context';
import { useContext } from 'react';

// export const BASE_URL = 'https://communityhelper.azurewebsites.net/graphql';
// export const BASE_URL = 'http://localhost:3000/graphql';
export const BASE_URL = 'http://10.7.115.18:3000/graphql';
export const tokenName = 'token';
export const userInfoName = 'userInfo';
export const getPendingJobsVar = {state: ["pending"]};
