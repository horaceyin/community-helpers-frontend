import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login(
    $username: String!
    $password: String!
    $expoPushToken: String
  ) {
    login(
      loginUserInput: { username: $username, password: $password }
      expoPushToken: $expoPushToken
    ) {
      access_token
      user {
        id
        username
        displayName
        avatar
        email
        phone
        address
        district
      }
    }
  }
`;

export const SIGNOUT = gql`
  mutation Signout($expoPushToken: String) {
    signout(expoPushToken: $expoPushToken)
  }
`;

// export const CREATE_HELP_REQUEST = gql`
//   mutation CreateHelpRequest(
//     $title: String!
//     $category: String!
//     $description: String!
//     $helpRequestDatetime: DateTime!
//     $price: Float!
//   ) {
//     createHelpRequest(
//       createHelpRequestInput: {
//         title: $title
//         category: $category
//         description: $description
//         helpRequestDatetime: $helpRequestDatetime
//         price: $price
//         # helpRequestDatetime: "2016-07-20T12:00:15.000Z"
//       }
//     ) {
//       category
//       creationDatetime
//       description
//       helpRequestDatetime
//       helpSeekerId
//       helperRating
//       id
//       location
//       title
//     }
//   }
// `;

export const CREATE_HELP_REQUEST = gql`
  mutation Mutation(
    $createHelpRequestInput: CreateHelpRequestInput!
    $files: [Upload!]!
  ) {
    createHelpRequest(
      createHelpRequestInput: $createHelpRequestInput
      files: $files
    ) {
      category
      creationDatetime
      description
      helpRequestDatetime
      helpSeekerId
      helperRating
      id
      address
      title
    }
  }
`;

export const UPDATE_HELP_REQUEST = gql`
  mutation UpdateHelpRequestMatching(
    $updateHelpRequestMatchingInput: UpdateHelpRequestMatchingInput!
  ) {
    updateHelpRequestMatching(
      updateHelpRequestMatchingInput: $updateHelpRequestMatchingInput
    ) {
      id
      state
    }
  }
`;

export const COMMIT_HELP_REQUEST = gql`
  mutation HelperAcceptHelpRequst(
    $takenHelpRequestUncheckedCreateInput: TakenHelpRequestUncheckedCreateInput!
  ) {
    HelperAcceptHelpRequst(
      createTakenHelpRequestInput: $takenHelpRequestUncheckedCreateInput
    ) {
      userId
      helpRequestId
      is_taken
      state
    }
  }
`;

export const SEEKER_ACCEPT_HELPER = gql`
  mutation HelpSeekerCommitJob($helpRequestId: Int!, $userId: Int!) {
    helpSeekerCommitJob(helpRequestId: $helpRequestId, userId: $userId) {
      userId
      state
      is_taken
    }
  }
`;

export const SEEKER_COMPLETE_REQUEST = gql`
  mutation UpdateTakenHelpRequest(
    $helpRequestId: Int!
    $userId: Int!
    $state: String!
  ) {
    updateTakenHelpRequest(
      helpRequestId: $helpRequestId
      userId: $userId
      updateTakenHelpRequestInput: { state: { set: $state } }
    ) {
      is_taken
      state
      userId
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateNewUser($newUserInput: LoginUserInput!, $file: Upload!) {
    signup(loginUserInput: $newUserInput, file: $file) {
      id
      username
      displayName
      email
      address
      city
      country
      phone
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!, $userId: Int!) {
    updateUser(updateUserInput: $updateUserInput, userId: $userId) {
      id
      username
      displayName
      avatar
      email
      phone
      address
      district
    }
  }
`;

export const SEND_USER_ACTION = gql`
  mutation createUserHelpRequestActionInput(
    $userId: Int!
    $helpRequestId: Int!
    $actionType: String
  ) {
    createUserHelpRequestAction(
      createUserHelpRequestActionInput: {
        userId: $userId
        helpRequestId: $helpRequestId
        actionType: $actionType
      }
    ) {
      id
      userId
      actionType
      helpRequestId
    }
  }
`;

export const UPDATE_USER_INTERESTS = gql`
  mutation UpdateUserInterests($categories: [String!]!, $userId: Int!) {
    createInterestWithStringBatch(categories: $categories, userId: $userId) {
      userId
      categoryId
    }
  }
`;

export const CREATE_REQUEST_CATEGORY_WITH_STRING = gql`
  mutation CreateHelpRequestCategoryWithStringBatch(
    $categories: [String!]!
    $helpRequestId: Int!
  ) {
    createHelpRequestCategoryWithStringBatch(
      categories: $categories
      helpRequestId: $helpRequestId
    ) {
      categoryId
      helpRequestId
    }
  }
`;

export const HELPER_ACCEPT_HELP_REQUEST = gql`
  mutation HelperAcceptHelpRequst(
    $createTakenHelpRequestInput: TakenHelpRequestUncheckedCreateInput!
  ) {
    HelperAcceptHelpRequst(
      createTakenHelpRequestInput: $createTakenHelpRequestInput
    ) {
      helpRequestId
      is_taken
      state
      userId
    }
  }
`;
