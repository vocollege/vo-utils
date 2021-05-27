export interface EditorDialogProps {
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
}
