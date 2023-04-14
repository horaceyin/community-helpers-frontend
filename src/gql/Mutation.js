import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginUserInput: { username: $username, password: $password }) {
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
      location
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
