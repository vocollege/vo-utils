import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: UpdateEventInput!) {
    createEvent(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;
