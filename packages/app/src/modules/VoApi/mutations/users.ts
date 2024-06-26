import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: UpdateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      firstname
      lastname
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      firstname
      lastname
      images {
        id
        title
        filename
        filesize
        filetype
        url
      }
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
      groupRoles {
        id
        label
        type
      }
      apps
      settings
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
