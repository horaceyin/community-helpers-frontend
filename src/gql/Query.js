import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      username
    }
  }
`;

export const FIND_MATCH_BY_STATE = gql`
  query FindByUserAndState($state: [String!]!) {
    findByUserAndState(state: $state) {
      id
      userId
      state
      helpRequest {
        title
        description
        helpRequestDatetime
        helpSeeker{
          username
        }
      }
    }
  }
`;
