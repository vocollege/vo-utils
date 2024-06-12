import { gql } from "@apollo/client";

export const GET_PAGE = gql`
  query Page($id: ID!) {
    page(id: $id) {
      id
      title
      short_title
      body
      status
      url
      editUrl
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
      settings
      tags {
        id
        label
      }
      images {
        id
        title
        filename
        filesize
        filetype
        url
      }
      attachments {
        id
        title
        filename
        filesize
        filetype
        url
        type
      }
    }
  }
`;

export const GET_PAGES = gql`
  query Pages(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetPagesOrderByClause]
    $filters: [GetPagesFilter]
  ) {
    pages(
      search: $search
      page: $page
      limit: $limit
      orderBy: $orderBy
      filters: $filters
    ) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        title
        status
        url
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
