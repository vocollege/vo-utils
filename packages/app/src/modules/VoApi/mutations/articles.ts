import { gql } from '@apollo/client';

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: UpdateArticleInput!) {
    createArticle(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: ID!, $input: UpdateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;
