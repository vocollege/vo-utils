import { gql } from '@apollo/client';

export const GET_SETTINGS = gql`
  query Settings {
    settings {
      name
      category
      value
    }
  }
`;


