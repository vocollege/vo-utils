import { gql } from "@apollo/client";

export const GET_SECTION = gql`
  query Section($id: ID!) {
    section(id: $id) {
      id
      title
      body
      status
      author {
        ... on User {
          id
          name
          type
        }
      }
      template
      image_full
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

export const GET_SECTIONS = gql`
  query Sections(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetSectionsOrderByClause]
  ) {
    sections(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        title
        status
        author {
          ... on User {
            id
            name
            type
          }
        }
        template
        created_at
        updated_at
      }
    }
  }
`;
