import { gql } from '@apollo/client';

export const CREATE_MENU = gql`
  mutation CreateMenu($input: UpdateMenuInput!) {
    createMenu(input: $input) {
      name
      title
      description
    }
  }
`;

export const UPDATE_MENU = gql`
  mutation UpdateMenu($name: String!, $input: UpdateMenuInput!) {
    updateMenu(name: $name, input: $input) {
      name
      title
      description
      links {
        id
      }
    }
  }
`;

export const DELETE_MENU = gql`
  mutation DeleteMenu($name: String!) {
    deleteMenu(name: $name) {
      name
    }
  }
`;
