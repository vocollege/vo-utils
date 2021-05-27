import { gql } from "@apollo/client";

export const GET_CONTACT_PAGE = gql`
  query ContactPage($id: ID!) {
    contactPage(id: $id) {
      id
      title
      body
      status
      url
      author
      contacts {
        id
        name
        type
      }
      tags {
        id
        label
      }
      created_at
      updated_at
    }
  }
`;

export const GET_CONTACT_PAGES = gql`
  query ContactPages(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetContactPagesOrderByOrderByClause]
  ) {
    contactPages(
      search: $search
      page: $page
      limit: $limit
      orderBy: $orderBy
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
        author
        created_at
        updated_at
      }
    }
  }
`;
