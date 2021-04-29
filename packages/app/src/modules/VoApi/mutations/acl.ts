import { gql } from '@apollo/client';

export const CREATE_ROLE = gql`
  mutation CreateRole($input: UpdateRoleInput!) {
    createRole(input: $input) {
      id
      name
      label,
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $input: UpdateRoleInput!) {
    updateRole(id: $id, input: $input) {
      id
      name
      label,
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id) {
      id
      name
      label,
    }
  }
`;

export const UPDATE_PERMISSION = gql`
  mutation UpdatePermission($id: ID!, $roles: [ID!]) {
    updatePermission(id: $id, roles: { sync: $roles } ) {
      id
      subject
      name
      label,
      roles {
        id
      }
    }
  }
`;

export const UPDATE_PERMISSIONS = gql`
  mutation UpdatePermissions($input: [UpdatePermissionInput!]!) {
    updatePermissions(input: $input) {
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