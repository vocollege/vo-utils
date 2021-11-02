import React from "react";

export interface SimpleTableColumn {
  title: string | React.ReactElement;
  field: string;
  render?: (rowData: any) => void;
}

export interface SimpleTableRow {
  [key: string]: any;
}

export interface SimpleTableProps {
  columns: SimpleTableColumn[];
  rows: SimpleTableRow[];
  isLoading?: boolean;
  elevation?: number;
  className?: string;
  labels?: {
    nothingFound?: string;
  };
  stickyHead?: boolean;
  classes?: {
    table?: string;
    head?: string;
    body?: string;
  };
}
