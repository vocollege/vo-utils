import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

// Custom.
import { useStyles } from "./styles";
import { FormToolbarProps } from "./global";
import I18n from "services/I18n";
import { useStylesCommon } from "ui/styles/common";

export default function FormToolbar(props: FormToolbarProps) {
  const { title, onSave, onCancel, loading, options, className } = props;
  const classes = useStyles();
  useStylesCommon();

  return (
    <Toolbar className={className}>
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
      <div className={classes.grow} />
      <Button
        variant="contained"
        color="secondary"
        aria-label="save item"
        startIcon={<SaveIcon />}
        className={classes.toolbarButton}
        onClick={onSave}
        disabled={loading || options?.saveButton?.disabled}
      >
        {I18n.get.actions.save}
      </Button>
      {onCancel && (
        <Button
          variant="outlined"
          color="secondary"
          aria-label="cancel"
          startIcon={<CloseIcon />}
          className={classes.toolbarButton}
          onClick={onCancel}
          disabled={loading || options?.cancelButton?.disabled}
        >
          {I18n.get.actions.cancel}
        </Button>
      )}
      {/* <IconButton edge="start" color="primary" aria-label="save item">
        <SaveIcon />
      </IconButton>
      <IconButton edge="start" color="primary" aria-label="cancel">
        <CloseIcon />
      </IconButton> */}
    </Toolbar>
  );
}
