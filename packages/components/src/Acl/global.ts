import { DocumentNode } from "@apollo/client";

export interface PermissionsProps {
  operations?: PermissionOperations;
  categories?: {
    roles: string;
    permissions: string;
  };
  title?: string;
  classes?: {
    formToolbar?: string;
  };
}

export interface PermissionOperations {
  get?: DocumentNode;
  update?: DocumentNode;
}

export interface PermissionType {
  id: number;
  subject: string;
  name: string;
  label: string;
  roles: RoleType[];
}

export interface RoleType {
  id: string;
}
