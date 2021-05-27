import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      firstname
      lastname
      active
      personal_number
      address1
      address2
      zip
      county
      country
      phone1
      profession
      status
      description
      images {
        id
        title
        filename
        filesize
        filetype
        url
      }
      updated_at
      created_at
      groups {
        id
        title
        type
      }
      roles {
        id
        label
        type
      }
    }
  }
`;

export const GET_USERS = gql`
  # query Users($page: Int!, $search: String) {
  #   users(page: $page, search: $search) {
  #     paginatorInfo {
  #       total
  #       currentPage
  #       hasMorePages
  #     }
  #     data {
  #       name
  #       email
  #     }
  #   }
  # }

  query Users(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetUsersOrderByOrderByClause]
  ) {
    users(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        name
        email
        active
        status
      }
    }
  }
`;
