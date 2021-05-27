import { gql } from "@apollo/client";

export const CREATE_CONTACT_PAGE = gql`
  mutation CreateContactPage($input: UpdateContactPageInput!) {
    createContactPage(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_CONTACT_PAGE = gql`
  mutation UpdateContactPage($id: ID!, $input: UpdateContactPageInput!) {
    updateContactPage(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_CONTACT_PAGE = gql`
  mutation DeleteContactPage($id: ID!) {
    deleteContactPage(id: $id) {
      id
    }
  }
`;
