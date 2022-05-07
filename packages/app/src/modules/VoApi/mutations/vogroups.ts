import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation CreateGroup($input: UpdateGroupInput!) {
    createGroup(input: $input) {
      id
      name
      title
      description
      created_at
      updated_at
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation UpdateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
      name
      title
      description
      created_at
      updated_at
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation DeleteGroup($id: ID!) {
    deleteGroup(id: $id) {
      id
    }
  }
`;

export const UPDATE_GROUPS_PERMISSION = gql`
  mutation UpdateGroupsPermission($id: ID!, $roles: [ID!]) {
    updateGroupsPermission(id: $id, roles: { sync: $roles }) {
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

export const CREATE_GROUPS_ROLE = gql`
  mutation CreateGroupsRole($input: UpdateGroupsRoleInput!) {
    createGroupsRole(input: $input) {
      id
      name
      label
    }
  }
`;

export const UPDATE_GROUPS_ROLE = gql`
  mutation UpdateGroupsRole($id: ID!, $input: UpdateGroupsRoleInput!) {
    updateGroupsRole(id: $id, input: $input) {
      id
      name
      label
    }
  }
`;

export const DELETE_GROUPS_ROLE = gql`
  mutation DeletGroupsRole($id: ID!) {
    deleteGroupsRole(id: $id) {
      id
      name
      label
    }
  }
`;
