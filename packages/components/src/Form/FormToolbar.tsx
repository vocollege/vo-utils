import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Custom.
import { useStyles } from "./styles";
import { FormToolbarProps } from "./global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

export default function FormToolbar(props: FormToolbarProps) {
  const { title, onSave, onCancel, loading, options, className, extraActions } =
    props;
  const classes = useStyles();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  // Methods.

  const showSaveLabel = () => {
    if (matchesMd) {
      return false;
    }
    return !options?.saveButton?.hideLabel;
  };

  const showCancelLabel = () => {
    if (matchesMd) {
      return false;
    }
    return !options?.cancelButton?.hideLabel;
  };

  return (
    <Toolbar className={className}>
      {title && title !== "" && (
        <>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.grow} />
        </>
      )}
      {extraActions}
      {!showSaveLabel() && (
        <IconButton
          className={classes.toolbarButtonNoLabel}
          color="success"
          aria-label="save item"
          onClick={onSave}
          disabled={loading || options?.saveButton?.disabled}
          size="small"
          title={I18n.get.actions.save}
        >
          <SaveIcon />
        </IconButton>
      )}
      {showSaveLabel() && (
        <Button
          variant="contained"
          color="success"
          aria-label="save item"
          startIcon={<SaveIcon />}
          className={classes.toolbarButton}
          onClick={onSave}
          disabled={loading || options?.saveButton?.disabled}
        >
          {options?.saveButton?.label || I18n.get.actions.save}
        </Button>
      )}
      {/* <Button
        variant={options?.saveButton?.hideLabel ? "text" : "contained"}
        color="secondary"
        aria-label="save item"
        startIcon={<SaveIcon />}
        className={clsx(classes.toolbarButton, {
          [classes.noLabel]: options?.saveButton?.hideLabel,
        })}
        onClick={onSave}
        disabled={loading || options?.saveButton?.disabled}
        title={options?.saveButton?.hideLabel && I18n.get.actions.save}
      >
        {!options?.saveButton?.hideLabel && I18n.get.actions.save}
      </Button> */}
      {onCancel && (
        <>
          {!showCancelLabel() && (
            <IconButton
              className={classes.toolbarButtonNoLabel}
              color="success"
              aria-label="cancel"
              onClick={onCancel}
              disabled={loading || options?.cancelButton?.disabled}
              size="small"
              title={I18n.get.actions.cancel}
            >
              <CloseIcon />
            </IconButton>
          )}
          {showCancelLabel() && (
            <Button
              variant="outlined"
              color="success"
              aria-label="cancel"
              startIcon={<CloseIcon />}
              className={classes.toolbarButton}
              onClick={onCancel}
              disabled={loading || options?.cancelButton?.disabled}
            >
              {options?.cancelButton?.label || I18n.get.actions.cancel}
            </Button>
          )}
          {/* <Button
          variant={options?.cancelButton?.hideLabel ? "text" : "outlined"}
          color="secondary"
          aria-label="cancel"
          startIcon={<CloseIcon />}
          className={clsx(classes.toolbarButton, {
            [classes.noLabel]: options?.cancelButton?.hideLabel,
          })}
          onClick={onCancel}
          disabled={loading || options?.cancelButton?.disabled}
          title={options?.cancelButton?.hideLabel && I18n.get.actions.cancel}
        >
          {!options?.cancelButton?.hideLabel && I18n.get.actions.cancel}
        </Button> */}
        </>
      )}
    </Toolbar>
  );
}
