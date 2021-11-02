import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Custom.
import { EditorDialogProps } from "./global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { useStyles } from "./styles";
import { stylesActions } from "@vocollege/theme";

const useStylesActions = makeStyles(() => stylesActions);

const FileManagerDialog: React.FC<EditorDialogProps> = (props) => {
  const {
    children,
    open,
    title,
    subtitle,
    contentText,
    loading,
    saveDisabled,
    onCancel,
    onConfirm,
    className,
    classes: classesProp,
    disableActions,
    disableCloseButton,
  } = props;
  const classes = useStyles();
  useStylesActions();

  // Method.

  const handleConfirm = () => {
    if (loading) {
      return;
    }
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    if (onCancel) {
      onCancel();
    }
  };

  // const showActions = () => {
  //   return typeof disableActions === "undefined" || !disableActions;
  // };

  // const showCloseButton = () => {
  //   return typeof disableCloseButton === "undefined" || !disableCloseButton;
  // };

  const showDialogTitle = () => {
    return !loading && (title || subtitle || !disableCloseButton);
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (loading && reason === "backdropClick") {
          return;
        }
        handleClose();
      }}
      classes={{
        paper: clsx(classes.paper, { [classes.loading]: loading }, className),
      }}
      // disableBackdropClick={loading}
    >
      {showDialogTitle() && (
        <DialogTitle disableTypography classes={{ root: classes.titleRoot }}>
          <div className={classes.titleWrapper}>
            {title && (
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
            )}
            {subtitle && subtitle !== "" && (
              <Typography variant="caption" className={classes.subtitle}>
                {subtitle}
              </Typography>
            )}
          </div>
          {!disableCloseButton && (
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent
        classes={{
          root: clsx(classes.contentRoot, classesProp?.contentRoot),
        }}
      >
        {contentText && !loading && (
          <DialogContentText>{contentText}</DialogContentText>
        )}
        {children}
      </DialogContent>
      {!disableActions && !loading && (
        <DialogActions classes={{ root: classes.actionsRoot }}>
          <Button onClick={handleClose} color="secondary" disabled={loading}>
            {I18n.get.actions.cancel}
          </Button>
          <Button
            onClick={handleConfirm}
            color="secondary"
            variant="contained"
            disabled={saveDisabled || loading}
            className={clsx("vo-global__actions-button-confirm", {
              "vo-global__actions-loading": loading,
            })}
            disableFocusRipple={loading}
          >
            <span className="vo-global__actions-button-confirm-label">
              {I18n.get.actions.save}
            </span>
            {loading && (
              <CircularProgress
                className="vo-global__actions-button-create-loading"
                color="inherit"
                size={25}
              />
            )}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default FileManagerDialog;
