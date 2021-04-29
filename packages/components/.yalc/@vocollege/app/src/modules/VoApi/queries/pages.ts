import { gql } from "@apollo/client";

export const GET_PAGE = gql`
  query Page($id: ID!) {
    page(id: $id) {
      id
      title
      body
      status
      url
      author
      created_at
      updated_at
      tags {
        id
        label
      }
      image {
        id
        title
        filename
        filesize
        filetype
        url
      }
    }
  }
`;

export const GET_PAGES = gql`
  query Pages(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetPagesOrderByOrderByClause]
  ) {
    pages(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
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
        author
        created_at
        updated_at
      }
    }
  }
`;
