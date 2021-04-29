import { gql } from '@apollo/client';

export const CREATE_PAGE = gql`
  mutation CreatePage($input: UpdatePageInput!) {
    createPage(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation UpdatePage($id: ID!, $input: UpdatePageInput!) {
    updatePage(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation DeletePage($id: ID!) {
    deletePage(id: $id) {
      id
    }
  }
`;
