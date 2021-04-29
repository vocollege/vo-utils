import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: UpdateUserInput!) {
    createUser(input: $input) {
      id
      name
      email,
      firstname,
      lastname
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email,
      firstname,
      lastname,
      updated_at
      created_at
      groups {
        id
        title
        type
      }
      roles {
        id
        label
        type
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;



