import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($input: UpdateApplicationInput!) {
    createApplication(input: $input) {
      id
      email
    }
  }
`;

export const UPDATE_APPLICATION = gql`
  mutation UpdateApplication($id: ID!, $input: UpdateApplicationInput!) {
    updateApplication(id: $id, input: $input) {
      id
      email
    }
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: ID!) {
    deleteApplication(id: $id) {
      id
    }
  }
`;
