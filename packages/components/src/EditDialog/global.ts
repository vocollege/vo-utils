import React from "react";
import { DialogProps } from "@mui/material/Dialog";

export interface EditorDialogProps {
  children?: React.ReactNode;
  open: boolean;
  title?: string;
  subtitle?: string;
  contentText?: React.ReactNode | null;
  loading?: boolean;
  saveDisabled?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  className?: string;
  classes?: {
    contentRoot?: string;
  };
  disableActions?: boolean;
  disableCloseButton?: boolean;
  draggable?: boolean;
  dialogProps?: DialogProps;
  extraActions?: React.ReactNode;
  confirmButtonLabel?: string;
}
