import { gql } from "@apollo/client";

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
      certified
      status
      url
      created_at
      updated_at
      parentGroupId
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
      # images {
      #   id
      #   title
      #   filename
      #   filesize
      #   filetype
      #   url
      # }
      users {
        id
        name
        email
        firstname
        lastname
      }
      contacts {
        id
        title
        type
      }
    }
    allGroups(categories: $categories) {
      id
      title
    }
  }
`;

export const GET_AVAILABLE_GROUPS = gql`
  query Group($categories: [String]) {
    allGroups(categories: $categories) {
      id
      title
    }
  }
`;

export const GET_GROUPS = gql`
  query Groups(
    $search: String
    $page: Int
    $limit: Int
    $orderBy: [GetGroupsOrderByOrderByClause]
  ) {
    groups(search: $search, page: $page, limit: $limit, orderBy: $orderBy) {
      paginatorInfo {
        total
        currentPage
        hasMorePages
      }
      data {
        id
        name
        title
        status
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
