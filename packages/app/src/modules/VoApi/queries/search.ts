import { gql } from "@apollo/client";

// Custom.
import { GET_USERS_FIELDS } from "./users";
import { GET_ARTICLES_FIELDS } from "./articles";

export const SEARCH_CONTENT = gql`
  query SearchContent(
    $search: String!
    $types: [String]
    $primaryField: String
    $limit: Int
    $entity: Boolean! = false
  ) {
    searchContent(
      search: $search
      types: $types
      primaryField: $primaryField
      limit: $limit
      entity: $entity
    ) {
      id
      title
      type
      urlAlias {
        id
        usage_id
        usage_type
        alias
      }
      entity @include(if: $entity) {
        ... on ValidigKeyword {
          id
          title
          regulation
        }
      }
    }
  }
`;

export const SEARCH_USER = gql`
  query SearchUser(
    $search: String!
    $roles: [String]
    $limit: Int
    $entity: Boolean
  ) {
    searchUser(search: $search, roles: $roles, limit: $limit, entity: $entity) {
      id
      name
      email
      firstname
      lastname
      type
    }
  }
`;

export const SEARCH_USERS_LIST = gql`
  query SearchUser(
    $search: String!
    $roles: [String]
    $limit: Int
    $entity: Boolean
  ) {
    searchUser(search: $search, roles: $roles, limit: $limit, entity: $entity) {
      ...UsersFields
    }
  }
  ${GET_USERS_FIELDS}
`;

export const SEARCH_GROUP = gql`
  query SearchGroup($categories: [String], $search: String!, $limit: Int) {
    searchGroup(categories: $categories, search: $search, limit: $limit) {
      id
      name
      title
      category
      certified
      type
      logo {
        id
        title
        filename
        filesize
        filetype
        url
      }
      logo2 {
        id
        title
        filename
        filesize
        filetype
        url
      }
      parentGroups {
        id
        name
        title
        logo {
          id
          title
          filename
          filesize
          filetype
          url
        }
        logo2 {
          id
          title
          filename
          filesize
          filetype
          url
        }
        parentGroups {
          id
          name
          title
          logo {
            id
            title
            filename
            filesize
            filetype
            url
          }
          logo2 {
            id
            title
            filename
            filesize
            filetype
            url
          }
        }
      }
    }
  }
`;
