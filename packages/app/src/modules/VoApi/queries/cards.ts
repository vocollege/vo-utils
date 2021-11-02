import { gql } from "@apollo/client";

export const GET_CARD = gql`
  query Card($id: ID!) {
    card(id: $id) {
      id
      title
      body
      status
      fields
      settings
      template
      editUrl
      author {
        ... on User {
          id
          name
          type
        }
      }
      entity {
        ... on User {
          id
          name
          type
        }
        ... on Page {
          id
          title
          type
        }
        ... on Event {
          id
          title
          type
        }
      }
      images {
        id
        title
        filename
        filesize
        filetype
        url
      }
      created_at
      updated_at
    }
  }
`;

export const GET_CARDS = gql`
  query Cards(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetCardsOrderByOrderByClause]
  ) {
    cards(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        title
        status
        template
        author {
          ... on User {
            id
            name
            type
          }
        }
        created_at
        updated_at
      }
    }
  }
`;
