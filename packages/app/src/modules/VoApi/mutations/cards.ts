import { gql } from "@apollo/client";

export const CREATE_CARD = gql`
  mutation CreateCard($input: UpdateCardInput!) {
    createCard(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $input: UpdateCardInput!) {
    updateCard(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`;
