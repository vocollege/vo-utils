import { ApolloClient, DocumentNode } from "@apollo/client";
import { useStyles } from "./styles";
import { GeneralObject } from "@vocollege/app/dist/global";
import React from "react";

export interface EnhancedTableOperations {
  category: string;
  get: DocumentNode;
  delete?: DocumentNode | undefined;
  // search?: DocumentNode;
  // searchCategory?: string;
}

export interface EnhancedTableColumns {
  title: string;
  field: string;
  width?: number | string;
  render?: (cellData: any) => void;
  disableSort?: boolean;
}

export interface EnhancedTableProps {
  title?: string;
  columns: EnhancedTableColumns[];
  addItem?: () => void;
  editItem?: (id: any, row?: any) => void;
  openItem?: (id: any, row?: any) => void;
  operations: EnhancedTableOperations;
  className?: string;
  order?: string;
  orderBy?: string;
  primaryField?: string;
  client?: ApolloClient<object>;
  actionButtons?: string[];
  renderActionButtons?: (row: any, index: number) => React.ReactElement;
  refetch?: () => void;
  labels?: {
    deleted?: string;
  };
  classes?: {
    paper?: string;
    table?: string;
  };
  queryVariables?: GeneralObject;
  querySearchVariables?: GeneralObject;
  onDelete?: (data: any) => void;
  enableSearch?: boolean;
  filters?: EnhancedTableFilter[];
  onDataChange?: (data: any) => void;
  actionButtonIsDisabled?: (action: string, row?: GeneralObject) => boolean;
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
  title?: string;
  total?: number;
  addItem?: () => void;
  enableSearch?: boolean;
  // searchLoading?: boolean;
  // onSearchTermChange?: (searchTerm: string) => void;
  // searchResult?: GeneralObject[];

  SearchFieldProps?: EnhancedTableSearchFieldProps;
  FiltersProps?: EnhancedTableFiltersProps;
}

export interface EnhancedTableStatusCellProps {
  data: any;
}

export interface EnhancedTableRolesProps {
  data: any;
  classesMap?: GeneralObject;
}

export interface EnhancedTableUserActiveProps {
  data: any;
}

export interface EnhancedTableApplicationsStatusProps {
  data: any;
}

export interface EnhancedTableSearchFieldProps {
  searchLoading?: boolean;
  onSearchTermChange?: (searchTerm: string) => void;
}

export interface EnhancedTableFiltersProps {
  filters?: EnhancedTableFilter[];
  onChange?: (filters: EnhancedTableSelectedFilter[]) => void;
}

export interface EnhancedTableFilter {
  name?: string;
  label?: string;
  default?: string | string[];
  multiple?: boolean;
  values?: EnhancedTableFilterValue[];
}

export interface EnhancedTableFilterValue {
  label: string;
  value: string;
}

export interface EnhancedTableSelectedFilter {
  name: string;
  value: string | string[];
}
