import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($input: UpdateBookInput!) {
    createBook(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;
