import { gql } from '@apollo/client';

export const GET_ACL = gql`
  query GetAcl {
    permissions {
      id
      subject
      name
      label
      roles {
        id
      }
    }
    roles {
      id
      name
      label
    }
  }
`;

export const GET_ROLE = gql`
  query Role($id: ID!) {
    role(id: $id) {
      id
      name
      label
    }
  }
`;

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      name
      label
    }
  }
`;

export const GET_PERMISSIONS = gql`
  query GetPermissions {
    permissions {
      id
      subject
      name
      label
    }
  }
`;
