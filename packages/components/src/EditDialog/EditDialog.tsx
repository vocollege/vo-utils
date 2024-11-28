import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Paper, { PaperProps } from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import Draggable from "react-draggable";

// Custom.
import { EditorDialogProps } from "./global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { useStyles } from "./styles";
import { stylesActions } from "@vocollege/theme";
import VoLoader from "../VoLoader";

const useStylesActions = makeStyles(() => stylesActions);

const EditDialog: React.FC<EditorDialogProps> = (props) => {
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
    draggable,
    dialogProps,
    extraActions,
    confirmButtonLabel,
  } = props;
  const classes = useStyles();
  useStylesActions();
  const [elementId, setElementId] = useState<number | null>(null);

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

  const DraggablePaper = (props: PaperProps) => {
    return (
      <Draggable
        handle={`#draggable-dialog-title-${elementId}`}
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  };

  // Effects.

  useEffect(() => {
    if (!elementId) {
      setElementId(Math.floor(Math.random() * 1000));
    }
  }, []);

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
      className={clsx(classes.root, {
        [classes.noBackdrop]: dialogProps?.hideBackdrop,
      })}
      PaperComponent={draggable ? DraggablePaper : Paper}
      {...dialogProps}
    >
      {showDialogTitle() && (
        <DialogTitle
          classes={{
            root: clsx(classes.titleRoot, { [classes.draggable]: draggable }),
          }}
        >
          <div
            className={classes.titleWrapper}
            id={`draggable-dialog-title-${elementId}`}
          >
            {title && (
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
            )}
            {subtitle && subtitle !== "" && (
              <Typography
                variant="caption"
                className={classes.subtitle}
                lineHeight={1.2}
              >
                {subtitle}
              </Typography>
            )}
          </div>
          {extraActions && (
            <div className={classes.extraActions}>{extraActions}</div>
          )}
          {!disableCloseButton && (
            <IconButton aria-label="close" onClick={handleClose} size="large">
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent
        classes={{
          root: clsx(
            classes.contentRoot,
            { [classes.loading]: loading },
            classesProp?.contentRoot
          ),
        }}
      >
        {contentText && !loading && (
          <DialogContentText>{contentText}</DialogContentText>
        )}
        {children}
      </DialogContent>
      {loading && <VoLoader />}
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
              {confirmButtonLabel || I18n.get.actions.save}
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

export default EditDialog;
