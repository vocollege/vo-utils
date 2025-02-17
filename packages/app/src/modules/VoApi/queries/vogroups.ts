import { gql } from "@apollo/client";

import { GET_EDUCATIONS_FIELDS } from "./educations";

export const GET_GROUP = gql`
  query Group($id: ID!, $categories: [String]) {
    group(id: $id) {
      id
      name
      title
      description
      body
      category
      docs
      website
      educator_category
      educator_type
      employer_type
      certified
      status
      url
      data_protection_policy_url
      created_at
      updated_at
      parentGroupId
      parentGroups {
        id
        name
        title
        category
      }
      location {
        id
        latitude
        longitude
      }
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
      logo3 {
        id
        title
        filename
        filesize
        filetype
        url
      }
      users {
        id
        name
        email
        firstname
        lastname
        type
        groupRoles {
          id
          label
          type
        }
      }
      contacts {
        id
        title
        type
      }
      vopage
      front_title
      front_body
      images {
        id
        title
        filename
        filesize
        filetype
        url
      }
      educations {
        id
        title
        code
        type
        pivot {
          education_id
          education_usage_id
          education_usage_type
          field
          certified
          comments
        }
      }
    }
    allGroups(categories: $categories) {
      id
      title
    }
  }
`;

export const GET_AVAILABLE_GROUPS = gql`
  query Group($categories: [String], $byPassMembership: Boolean) {
    allGroups(categories: $categories, byPassMembership: $byPassMembership) {
      id
      title
      category
    }
  }
`;

export const GET_GROUPS = gql`
  query Groups(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetGroupsOrderByClause]
    $filters: [GetGroupsFilter]
  ) {
    groups(
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
        name
        title
        category
        status
        vopage
        created_at
        updated_at
      }
    }
  }
`;

export const GET_GROUPS_ACL = gql`
  query GetGroupsAcl {
    groupsRoles {
      id
      name
      label
    }
    groupsPermissions {
      id
      subject
      name
      label
      roles {
        id
      }
    }
  }
`;

export const GET_GROUPS_ROLE = gql`
  query GroupsRole($id: ID!) {
    groupsRole(id: $id) {
      id
      name
      label
    }
  }
`;

export const GET_GROUPS_ROLES = gql`
  query GroupsRoles {
    groupsRoles {
      id
      name
      label
    }
  }
`;

export const GET_GROUPS_PERMISSIONS = gql`
  query GroupsPermissions {
    groupsPermissions {
      id
      subject
      name
      label
    }
  }
`;
