import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      username
      displayName
      avatar
      email
      address
      phone
      district
      city
      country
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
        helpSeeker {
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
        helpSeeker {
          displayName
        }
      }
    }
  }
`;

export const GET_RECOMMENDED_JOBS = gql`
  query GetRecommendedHelpRequests(
    $userId: Float!
    $start: Float!
    $end: Float!
  ) {
    getRecommendedHelpRequests(userId: $userId, start: $start, end: $end) {
      id
      title
      price
      images
      category
      location
      description
      creationDatetime
      helpRequestDatetime
      helpSeeker {
        id
        displayName
        district
        avatar
        phone
      }
      helperRating
      isDislike
      isLike
      recommendationOrder
    }
  }
`;

export const FIND_ALL_JOBS_IN_HOME = gql`
  query HelpRequests($take: Int, $skip: Int) {
    helpRequests(take: $take, skip: $skip) {
      id
      title
      price
      images
      category
      location
      description
      creationDatetime
      helpRequestDatetime
      helpSeeker {
        id
        displayName
        district
        avatar
        phone
      }
      helperRating
    }
  }
`;
