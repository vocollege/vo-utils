import { gql } from '@apollo/client';

export const CREATE_SECTION = gql`
  mutation CreateSection($input: UpdateSectionInput!) {
    createSection(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_SECTION = gql`
  mutation UpdateSection($id: ID!, $input: UpdateSectionInput!) {
    updateSection(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_SECTION = gql`
  mutation DeleteSection($id: ID!) {
    deleteSection(id: $id) {
      id
    }
  }
`;
