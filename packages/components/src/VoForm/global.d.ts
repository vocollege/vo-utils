import { DocumentNode } from "@apollo/client";
import { TreeItem } from "react-sortable-tree";

// Custom.
import { FileManagerFolderElement } from "components/FileManager/global";

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
    saved?: string;
    deleted?: string;
    fieldRequired?: string;
  };
  operations: FormOperations;
  variables?: {
    [key: string]: any;
  };
  paths: {
    back: string;
  };
  initialState: any;
  pageTitleField: string;
  primaryField?: string;
}

export interface FormNakedProps {
  tabs: FormTabProps[];
}

export interface FormTabProps {
  key: string;
  label: string;
  fields: FormField[];
  children?: React.ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "password"
    | "select"
    | "editor"
    | "switch"
    | "content_list"
    | "sortable_tree"
    | "file_uploader"
    | "url_field"
    | "author_field"
    | "date_field"
    | "tags_field"
    | "file_field"
    | "location";
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
  render?: (data: any) => JSX.Element;
  onChange?: (data: any) => void;
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
}

export interface FormTabsProps {
  className?: string;
  tabs?: any;
  currentTab: any;
  setTab: any;
}
export interface FormViewsProps {
  children?: React.ReactNodeArray;
  currentTab: any;
  setTab: any;
}

export interface FormToolbarProps {
  title?: string | JSX.Element;
  onSave: () => void;
  onCancel?: () => void;
  loading: boolean;
  options?: {
    saveButton?: FormToolbarButton;
    cancelButton?: FormToolbarButton;
  };
  className?: string;
}

export interface FormToolbarButton {
  disabled?: boolean;
}

export interface FormFieldContentListProps {
  name: string;
  label: string;
  onChange?: (item: EntityPickerItem[]) => void;
  onReset?: () => void;
  items?: [any];
  types: string;
}

export interface FormFieldContentListItem extends EntityPickerItem {
  position?: number;
}

export interface FormFieldSortableTreeProps {
  name: string;
  label: string;
  onChange?: (items: any[]) => void;
  onReset?: () => void;
  items?: FormFieldSortableTreeItem[];
  types: string;
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
  types: string;
  onChange?: (
    item: FormFieldSortableTreeItem,
    path: FormFieldNumberOrStringArray
  ) => void;
  onCancel?: () => void;
  item?: TreeItem | null;
  itemPath?: FormFieldNumberOrStringArray | null;
}

export type FormFieldNumberOrStringArray = Array<string | number>;

export interface EntityPickerItemFields {
  title?: string;
}

export interface EntityPickerProps {
  className?: string;
  dialog: EntityPickerDialogProps;
}

export interface EntityPickerDialogProps {
  onSelect?: (item: EntityPickerItem) => void;
  onClose?: () => void;
  open: boolean;
  types: string;
  primaryField?: string;
  addNew?: boolean;
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
}

export interface EntityFieldProps {
  name?: string;
  label?: string;
  value?: string;
  className?: string;
  onChange?: (item: EntityPickerItem) => void;
  onReset?: () => void;
  types: string;
  primaryField?: string;
  required?: boolean;
}

export interface TagsFieldProps {
  label?: string;
  value?: TagsFieldItem[];
  required?: boolean;
  types: string;
  onChange?: (items: TagsFieldItem[]) => void;
  addNew?: boolean;
}

export interface TagsFieldItem {
  id: string;
  label: string;
  slug?: string;
}

export interface FileFieldProps {
  label?: string;
  value?: FileManagerFolderElement[];
  required?: boolean;
  onChange?: (files: FileManagerFolderElement[]) => void;
  filetypes?: string[];
  multiple?: boolean;
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
