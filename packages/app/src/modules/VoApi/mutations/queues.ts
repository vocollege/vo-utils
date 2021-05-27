import { gql } from "@apollo/client";

export const CREATE_QUEUE = gql`
  mutation CreateQueue($input: UpdateQueueInput!) {
    createQueue(input: $input) {
      id
      title
      items {
        ... on Article {
          id
          title
        }
        ... on Page {
          id
          title
        }
        ... on Section {
          id
          title
        }
      }
    }
  }
`;

export const UPDATE_QUEUE = gql`
  mutation UpdateQueue($id: ID!, $input: UpdateQueueInput!) {
    updateQueue(id: $id, input: $input) {
      id
      title
      status
      items {
        ... on Article {
          id
          title
        }
        ... on Page {
          id
          title
        }
        ... on Section {
          id
          title
        }
      }
      created_at
      updated_at
    }
  }
`;

export const DELETE_QUEUE = gql`
  mutation DeleteQueue($id: ID!) {
    deleteQueue(id: $id) {
      id
    }
  }
`;
