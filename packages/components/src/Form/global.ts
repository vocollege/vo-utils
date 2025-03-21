import React from "react";
import {
  ApolloClient,
  DocumentNode,
  MutationHookOptions,
} from "@apollo/client";
import { TreeItem } from "@nosferatu500/react-sortable-tree";
import { FilledTextFieldProps } from "@mui/material/TextField";
import { ButtonProps } from "@mui/material/Button";
import { BadgeProps } from "@mui/material/Badge";
import { DialogProps } from "@mui/material/Dialog";
// Custom.
import {
  FileManagerFolderElement,
  FileManagerPortfolio,
} from "@/FileManager/global";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

export interface FormProps extends FormNakedProps {
  labels: {
    loading?: string;
    create?: string;
    update?: string;
    created?: string;
    updated?: string;
    deleted?: string;
    fieldRequired?: string;
  };
  operations: FormOperations;
  variables?: {
    [key: string]: any;
  };
  paths?: {
    back?: string;
  };
  initialState: any;
  pageTitleField?: string;
  primaryField?: string;
  client?: ApolloClient<object>;
  onComplete?: (data: any, saveType?: string) => void;
  onCancel?: (data: any) => void;
  onSave?: (data: any, saveType?: string) => any;
  urlParams?: { [key: string]: any };
  createParam?: string;
  classes?: {
    root?: string;
    paper?: string;
    paperRoot?: string;
    toolbar?: string;
    formTabs?: string;
    formWrapper?: string;
    header?: string;
  };
  disableToolbar?: boolean;
  onFormChange?: (formState: { isDirty: boolean; isValid: boolean }) => void;
  onQueryLoading?: (loading: boolean) => void;
  renderPageTitle?: (state: any) => string;
  initialData?: any;
  onDataChange?: (data: any, fetchedData: any) => void;
  loadQueryOnParamsChange?: boolean;
  toolbarProps?: FormToolbarProps;
  header?: React.ReactNode;
  refetchQueries?: MutationHookOptions["refetchQueries"];
  autosave?: boolean;
  autosaveInterval?: number; 
}

export interface FormNakedProps {
  tabs: FormTabProps[];
}

export interface FormTabProps {
  key: string;
  label: React.ReactNode;
  fields: FormField[];
  badge?: BadgeProps;
  children?: React.ReactNode;
  visible?: Boolean;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "editor"
    | "switch"
    | "content_list"
    | "sortable_tree"
    | "file_uploader"
    | "url_field"
    | "entity_field"
    | "date_field"
    | "datetime_field"
    | "time_field"
    | "tags_field"
    | "file_field"
    | "location"
    | "checkboxes"
    | "content"
    | "transfer_list"
    | "autocomplete"
    | "list"
    | "info"
    | "hidden"
    | "empty"
    | "custom";
  inputType?: string;
  required?: boolean;
  overrideValue?: any;
  grid?: {
    xs?: FormFieldGridBreakpointValues;
    sm?: FormFieldGridBreakpointValues;
    md?: FormFieldGridBreakpointValues;
    lg?: FormFieldGridBreakpointValues;
    xl?: FormFieldGridBreakpointValues;
  };
  validation?: {
    [key: string]: any;
  };
  params?: {
    [key: string]: any;
  };
  render?: (fieldValue: any, data?: any) => JSX.Element;
  onChange?: (value: any, data: any) => void;
  triggers?: string[];
  hidden?: boolean;
  field?: React.ReactNode;
}

export type FormFieldGridBreakpointValues =
  | false
  | "auto"
  | true
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export interface FormOperations {
  category: string;
  searchCategory?: string;
  get: DocumentNode;
  create?: DocumentNode;
  update: DocumentNode;
  search?: DocumentNode;
  getOnCreate?: DocumentNode;
}

export interface FormTabsProps {
  className?: string;
  tabs?: any;
  currentTab: any;
  setTab: any;
}
export interface FormViewsProps {
  // children?: React.ReactNodeArray;
  children?: React.ReactNode[];
  currentTab: any;
  setTab: any;
}

export interface FormToolbarProps {
  title?: string | JSX.Element;
  onSave?: () => void;
  onSubmit?: () => void;
  onCancel?: FormProps["onCancel"];
  loading?: boolean;
  options?: {
    saveButton?: FormToolbarButton;
    cancelButton?: FormToolbarButton;
    submitButton?: FormToolbarButton;
    submitConfirmDescription?: string;
  };
  className?: string;
  extraActions?: React.ReactNode;
}

export interface FormToolbarButton {
  visible?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  label?: string;
}

export interface FormFieldContentListProps {
  name: string;
  label: string;
  onChange?: (items: FormFieldContentListItem[]) => void;
  onReset?: () => void;
  items?: any[];
  required?: boolean;
  // types: string;
  // types: string[];
  // filetypes?: string[];
  multiple?: boolean;
  contentType?: "entity" | "file";
  dialog?: EntityPickerDialogProps;
  renderItemTitle?: (item: FormFieldContentListItem) => string;
  createCallback?: () => EntityPickerItem;
  createCallbackLabel?: string;
  overrideValue?: EntityPickerItem[];
  renderActionButtons?: (item: FormFieldContentListItem) => React.ReactElement;
  hideType?: boolean;
  renderExtraDetails?: (item: FormFieldContentListItem) => React.ReactElement;
}

export interface FormFieldContentListCustomAction {
  title?: string;
  callback?: (action: string, item: FormFieldContentListItem) => void;
}

export type FormFieldContentListItem =
  | FormFieldContentListItemEntity
  | FormFieldContentListItemFile;

export interface FormFieldContentListItemEntity extends EntityPickerItem {
  position?: number;
}

export interface FormFieldContentListItemFile extends FileManagerFolderElement {
  position?: number;
}

export interface FormFieldSortableTreeProps {
  name: string;
  label: string;
  onChange?: (items: any[]) => void;
  onReset?: () => void;
  items?: FormFieldSortableTreeItem[];
  // types: string[];
  dialog?: EntityPickerDialogProps;
}

export interface FormFieldSortableTreeItem extends EntityPickerItem {
  parent_id: string;
  subtitle?: string;
  changed?: boolean;
  [key: string]: any;
}

export interface FormFieldSortableTreeItemFormProps {
  title?: string;
  open: boolean;
  // types: string[];
  onChange?: (item: FormFieldSortableTreeItem, path: number[]) => void;
  // onChange?: (
  //   item: FormFieldSortableTreeItem,
  //   path: FormFieldNumberOrStringArray
  // ) => void;
  onCancel?: () => void;
  item?: TreeItem | null;
  itemPath?: number[] | null;
  // itemPath?: FormFieldNumberOrStringArray | null;
  dialog?: EntityPickerDialogProps;
}

export type FormFieldNumberOrStringArray = Array<string | number>;

export interface EntityPickerItemFields {
  title?: string;
}

export interface EntityPickerProps {
  className?: string;
  dialog?: EntityPickerDialogProps;
  disableButtonLabel?: boolean;
  buttonLabel?: React.ReactElement;
  buttonColor?: ButtonProps["color"];
  buttonTitle?: string;
  icon?: React.ReactNode;
}

export interface EntityPickerDialogProps {
  onSelect?: (item: EntityPickerItem) => void;
  onClose?: () => void;
  open?: boolean;
  types: string[];
  primaryField?: string;
  addNew?: boolean;
  renderTitleField?: (item: any) => string;
  query?: DocumentNode;
  category?: string;
  variables?: { [key: string]: any };
  client?: ApolloClient<object>;
  extraDetails?: (item: any) => React.ReactNode;
  DialogProps?: DialogProps;
}

export interface FormFieldUrlFieldProps {
  name?: string;
  label?: string;
  value?: string;
  // item?: FormFieldUrl;
  // initialValue?: FormFieldUrl;
  overrideValue?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  helperText?: string;
  notNew?: boolean;
  fieldLock?: boolean;
}

export interface FormFieldUrlAlias {
  id?: number;
  usage_id?: number;
  usage_type?: string;
  alias?: string;
}

export interface EntityPickerItem {
  id: string;
  title: string;
  type: string;
  urlAlias?: FormFieldUrlAlias;
  file?: FileManagerFolderElement | null;
}

export interface EntityFieldProps {
  name?: string;
  label?: string;
  value?: any;
  // value?: string | EntityPickerItem;
  className?: string;
  onChange?: (item: EntityPickerItem) => void;
  onReset?: () => void;
  createCallback?: () => EntityPickerItem;
  createCallbackLabel?: string;
  // types: string[];
  // primaryField?: string;
  fields?: { [key: string]: any };
  required?: boolean;
  renderFieldValue?: (item: EntityPickerItem) => void;
  dialog: EntityPickerDialogProps;
  overrideValue?: EntityPickerItem;
  textfieldProps?: FilledTextFieldProps;
}

export interface TagsFieldProps {
  label?: string;
  value?: TagsFieldItem[];
  required?: boolean;
  onChange?: (items: TagsFieldItem[]) => void;
  dialog?: EntityPickerDialogProps;
}

export interface TagsFieldItem {
  id: string;
  label: string;
  slug?: string;
}

export interface FileFieldProps {
  title?: string;
  label?: string;
  value?: FileManagerFolderElement[];
  required?: boolean;
  onChange?: (files: FileManagerFolderElement[]) => void;
  filetypes?: string[];
  multiple?: boolean;
  directUpload?: boolean;
  portfolio?: FileManagerPortfolio;
  operations?: {
    createFile?: DocumentNode;
    updateFile?: DocumentNode;
    deleteFile?: DocumentNode;
  };
  hideThumbnail?: boolean;
  simplified?: boolean;
  client?: ApolloClient<object> | null;
  disabled?: boolean;
}

export interface FormFieldLocationProps {
  label?: string;
  value?: FormFieldLocation;
  required?: boolean;
  onChange?: (location: FormFieldLocation) => void;
}

export interface FormFieldLocation {
  id?: string;
  latitude?: string;
  longitude?: string;
}

export interface FormFieldTransferListProps {
  name?: string;
  label?: string;
  sourceLabel?: string;
  targetLabel?: string;
  source?: FormFieldContentListItem[];
  target?: FormFieldContentListItem[];
  renderItemTitle?: (item: FormFieldContentListItem) => string;
  renderItemDetails?: (item: FormFieldContentListItem) => string;
  onChange?: (items: FormFieldContentListItem[]) => void;
}
