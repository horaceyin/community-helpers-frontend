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
      interests {
        categoryId
        userId
      }
      city
      country
    }
  }
`;

export const FIND_MATCH_BY_STATE = gql`
  query FindByUserAndState($state: [String!]!) {
    findByUserAndState(state: $state) {
      helpRequestId
      helpRequest {
        id
        title
        description
        price
        address
        helpRequestDatetime
        helpSeeker {
          id
          displayName
          district
          avatar
          phone
        }

        creationDatetime
        creationDatetime
        helperRating
        images
        category
      }
      is_taken
      state
    }
  }
`;

export const FIND_HELP_REQUESTS_CREATED_BY_ME = gql`
  query Me {
    me {
      userCreatedHelpRequests {
        title
        description
        helpRequestDatetime
        address
        price
        id
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
        address
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
      address
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
  query HelpRequests($is_taken: Boolean, $take: Int, $skip: Int) {
    helpRequests(is_taken: $is_taken, take: $take, skip: $skip) {
      id
      title
      price
      images
      category
      address
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
