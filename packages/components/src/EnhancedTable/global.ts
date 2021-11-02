import { ApolloClient, DocumentNode } from "@apollo/client";
import { useStyles } from "./styles";
import { GeneralObject } from "@vocollege/app/dist/global";
import React from "react";

export interface EnhancedTableOperations {
  category: string;
  get: DocumentNode;
  delete?: DocumentNode | undefined;
}

export interface EnhancedTableColumns {
  title: string;
  field: string;
  width?: number | string;
  render?: (cellData: any) => void;
}

export interface EnhancedTableProps {
  title: string;
  columns: EnhancedTableColumns[];
  addItem?: () => void;
  editItem?: (id: any) => void;
  openItem?: (id: any) => void;
  operations: EnhancedTableOperations;
  className?: string;
  order?: string;
  orderBy?: string;
  primaryField?: string;
  client?: ApolloClient<object>;
  actionButtons?: string[];
  renderActionButtons?: (row: any) => React.ReactElement;
  refetch?: () => void;
  labels?: {
    deleted?: string;
  };
}

export interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  order: "desc" | "asc" | undefined;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  columns: EnhancedTableColumns[];
  actionButtons?: boolean;
}

export interface EnhancedTableToolbarProps {
  title: string;
  addItem?: () => void;
}

export interface EnhancedTableStatusCellProps {
  data: any;
}

export interface EnhancedTableRolesProps {
  data: any;
  classesMap?: GeneralObject;
}
