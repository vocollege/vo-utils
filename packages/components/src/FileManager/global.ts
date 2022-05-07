import React from "react";
import { DocumentNode, ApolloClient } from "@apollo/client";
import { SvgIconProps } from "@mui/material";
import { FormField } from "Form/global";

export interface FileManagerProps {
  className?: string;
  classes?: {
    toolbar?: string;
    actions?: string;
    bottomArea?: string;
  };
  portfolioId: null | string;
  baseUrl?: string;
  // path?: string;
  folderId?: null | string;
  client?: ApolloClient<object> | null;
  operations: FileManagerOperations;
  onDoubleClick?: (element: FileManagerFolderElement) => void;
  onBreadcrumbClick?: (value: string, type: string) => void;
  filetypes?: string[];
}

export interface FileManagerOperations {
  category: string;
  get: DocumentNode;
  createPortfolio?: DocumentNode;
  updatePortfolio?: DocumentNode;
  deletePortfolio?: DocumentNode;
  createFolder?: DocumentNode;
  updateFolder?: DocumentNode;
  deleteFolder?: DocumentNode;
  createFile?: DocumentNode;
  updateFile?: DocumentNode;
  deleteFile?: DocumentNode;
}

export interface FileManagerGridProps {
  items: FileManagerItems;
  category: string;
  onSelect?: (element: FileManagerFolderElement | null) => void;
  onAction?: (
    action: FileManagerElementAction,
    element: FileManagerFolderElement
  ) => void;
  onDoubleClick?: (url: string, element: FileManagerFolderElement) => void;
  selectedElement: FileManagerFolderElement | null;
  baseUrl: string;
  search?: string;
  order?: "ASC" | "DESC";
  orderBy?: string;
}

export interface FileManagerListProps {
  items: FileManagerItems;
  category: string;
  onSelect?: (element: FileManagerFolderElement) => void;
  selectedElement: FileManagerFolderElement | null;
  baseUrl: string;
}

export interface FileManagerItems {
  [key: string]: {
    data: FileManagerFolderElement[];
    portfolio?: FileManagerPortfolio;
    folder?: FileManagerFolder;
  };
}

export interface FileManagerElementProps {
  // id: string | number;
  // title: string;
  // elementType: string;
  // type?: string;
  // url: string;
  portfolio?: FileManagerPortfolio;
  element: FileManagerFolderElement;
  baseUrl?: string;
  onSelect?: (element: FileManagerFolderElement) => void;
  onAction?: (
    action: FileManagerElementAction,
    element: FileManagerFolderElement
  ) => void;
  onDoubleClick?: (url: string, element: FileManagerFolderElement) => void;
  selected?: boolean | null;
}

export type FileManagerElementAction =
  | "edit"
  | "delete"
  | "download"
  | "copy_url";

export interface FileManagerPortfolio {
  __typename?: string;
  id: string;
  name: string;
  disk: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// export interface FileManagerPortfolio {
//   __typename?: string;
//   id: string;
//   name: string;
//   title: string;
//   description?: string;
// }

export interface FileManagerFolder {
  __typename?: string;
  id: string;
  portfolio_id: string;
  title: string;
  fullPath: FileManagerBreadcrumbLink[];
}

export interface FileManagerFile {
  __typename?: string;
  id: string;
  portfolio_id: string;
  folder_id: string;
  title: string;
  description: string;
  status: number;
  path: string;
  filename: string;
  filesize: number;
  filetype: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface FileManagerFolderElement
  extends FileManagerPortfolio,
    FileManagerFolder,
    FileManagerFile {
  [key: string]: any;
}

export interface FileManagerBreadcrumb {
  id: string | null;
  title: string;
}

export interface FileManagerBreadcrumbLink {
  id?: string | null;
  title: string;
  path?: string | null;
}

export interface FileManagerBreadcrumbsProps {
  loading?: boolean;
  items: FileManagerItems;
  category: string;
  baseUrl: string;
  path?: FileManagerBreadcrumbLink[];
  onClick?: (value: string, type: string) => void;
}

export interface FileManagerActionsProps {
  actions?: FileManagerActionName[];
  onClick: (action: string | null) => void;
  className?: string;
}

export type FileManagerActionName = "Portfolio" | "Folder" | "File";

export interface FileManagerAction {
  icon: React.ReactElement;
  name: FileManagerActionName;
  label: string;
}

export interface FileManagerFormProps {
  title?: string;
  portfolio?: FileManagerPortfolio | null;
  // path?: FileManagerBreacrumb[];
  folder?: FileManagerFolder | null;
  // folderId?: string | null;
  onChange?: (element: FileManagerFolderElement) => void;
  onCancel?: () => void;
  operations?: FileManagerFormOperations;
  messages?: FileManagerFormMessages;
  open: boolean;
  client?: ApolloClient<any> | null;
  editElement?: FileManagerFolderElement;
  fields?: FormField[];
  initialState?: any;
  hidePath?: boolean;
}

export interface FileManagerFormOperations {
  create?: DocumentNode;
  update?: DocumentNode;
}

export interface FileManagerFormMessages {
  createTitle?: string;
  updateTitle?: string;
  itemCreated?: string;
  itemUpdated?: string;
}

export interface FileManagerPortfolioFormProps {
  onChange?: (portfolio: FileManagerFolderElement) => void;
  onCancel?: () => void;
  operations?: FileManagerFormOperations;
  open?: boolean;
  client?: ApolloClient<object> | null;
  editElement?: FileManagerFolderElement;
}

export interface FileManagerFolderFormProps extends FileManagerFormProps {}

export interface FileManagerFileFormProps extends FileManagerFormProps {}

// export interface FileManagerDialogProps {
//     open: boolean;
//     title?: string;
//     subtitle?: string;
//     contentText?: React.ReactElement;
//     loading?: boolean;
//     saveDisabled?: boolean;
//     onCancel?: () => void;
//     onConfirm?: () => void;
// }

export interface FileManagerToolbarProps {
  className?: string;
  title?: string;
  selectedElement?: FileManagerFolderElement | null;
}

export interface FileManagerIconProps extends SvgIconProps {
  element: FileManagerFolderElement;
  invisibleBadge?: boolean;
}

export interface FileManagerBottomAreaProps {
  className?: string;
  selectedElement?: FileManagerFolderElement | null;
}

export interface FileManagerHeaderProps {
  className?: string;
  search?: string;
  order?: string;
  orderBy?: string;
  onChange?: (search: string, order: string, orderBy: string) => void;
}

export interface FileManagerDialogProps {
  open: boolean;
  className?: string;
  title?: string;
  // label?: string;
  // value?: FileManagerFolderElement[];
  // required?: boolean;
  onChange?: (files: FileManagerFolderElement[]) => void;
  onCancel?: () => void;
  filetypes?: string[];
  multiple?: boolean;
  files?: FileManagerFolderElement[];
  client?: ApolloClient<object> | null;
}

export interface FileManagerPickerProps {
  className?: string;
  onSelect?: (files: FileManagerFolderElement[]) => void;
  filetypes?: string[];
}
