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

export const FIND_MATCH_BY_STATE_IN_HOME = gql`
  query FindByUserAndState($state: [String!]!) {
    findByUserAndState(state: $state) {
      id
      state
      helpRequest {
        title
        price
        description
        location
        category
        helpRequestDatetime
        helpSeeker{
          displayName
        }
      }
    }
  }
`;

export const FIND_ALL_JOBS_IN_HOME = gql`
  query HelpRequests {
    helpRequests {
      category
      title
      price
      location
      id
      helpSeeker {
        displayName
      }
      description
      helpRequestDatetime
      helpRequestMatchings {
        id
        state
      }
    }
  }
`;
