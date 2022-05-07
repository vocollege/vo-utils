import { gql } from "@apollo/client";

export const GET_APPLICATION = gql`
  query Application($id: ID!, $categories: [String]) {
    application(id: $id) {
      id
      email
      firstname
      lastname
      category
      status
      responsible {
        id
        email
        name
        firstname
        lastname
        type
      }
      comments
      content
      created_at
      updated_at
    }
    allGroups(categories: $categories) {
      id
      title
      category
    }
  }
`;

export const GET_APPLICATIONS = gql`
  query Applications(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetApplicationsOrderByClause]
  ) {
    applications(
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
        email
        firstname
        lastname
        category
        status
        responsible {
          id
          email
          name
          firstname
          lastname
          type
        }
        created_at
        updated_at
      }
    }
  }
`;
