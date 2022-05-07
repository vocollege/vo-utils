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
      postalcode
      town
      country
      phone1
      profession
      status
      gdpr
      description
      updated_at
      created_at
      images {
        id
        title
        filename
        filesize
        filetype
        url
      }
      roles {
        id
        label
        type
      }
      groupRoles {
        id
        label
        type
      }
      groups {
        id
        title
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
    $orderBy: [GetUsersOrderByClause]
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
        updated_at
        created_at
        roles {
          id
          label
          type
        }
        groupRoles {
          id
          label
          type
        }
        groups {
          id
          name
          title
        }
        validig {
          id
        }
      }
    }
  }
`;

export const GET_ACCOUNT = gql`
  query Account($id: ID!) {
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
      postalcode
      town
      country
      phone1
      profession
      status
      description
      workplace
      gdpr
      images {
        id
        title
        filename
        filesize
        filetype
        url
      }
    }
    userSettings {
      publicDefaultPortfolio {
        id
        name
        disk
      }
    }
  }
`;
