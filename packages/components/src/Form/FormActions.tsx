import React from "react";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PublishIcon from "@mui/icons-material/Publish";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/material/styles";
import Fade from "@mui/material/Fade";

// Custom
import FloatingButton from "FloatingButton";
import { I18n } from "@vocollege/app";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formActionsWrapper: {
      alignItems: "flex-end",
      bottom: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      right: theme.spacing(2),
      "& > .MuiSpeedDial-root:not(:last-child), > .MuiButtonBase-root:not(:last-child)":
        {
          marginBottom: 0,
        },
    },
    fabProgress: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
    },
    fabOverlay: {
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
  })
);

interface SaveButtonType {
  type: "simple" | "advanced";
  disabled: boolean;
}
interface CancelButtonType {
  disabled?: boolean;
}
interface FormActionsType {
  onSave: any;
  onCancel: any;
  loading: boolean;
  options: {
    saveButton: SaveButtonType;
    cancelButton?: CancelButtonType;
  };
}

const actions = [
  { icon: <SaveAltIcon />, name: "save", label: "Spara" },
  { icon: <PublishIcon />, name: "save_publish", label: "Spara och publicera" },
];

const FormActions = ({
  onSave,
  onCancel,
  loading,
  options,
}: FormActionsType) => {
  const classes = useStyles();
  return (
    <div className={classes.formActionsWrapper}>
      <Fade in={loading}>
        <div className={classes.fabOverlay}></div>
      </Fade>
      {(!options.saveButton.type || options.saveButton.type === "advanced") && (
        <>
          <FloatingButton
            label={I18n.get.actions.save}
            color="success"
            actions={actions}
            actionsDirection="left"
            onClick={(action: string) => onSave(action)}
            fabProps={{
              disabled: options.saveButton.disabled,
            }}
          >
            <SaveIcon />
            <SaveIcon />
          </FloatingButton>
          {loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </>
      )}
      {options.saveButton.type === "simple" && (
        <>
          <FloatingButton
            fabProps={{
              disabled: options.saveButton.disabled,
            }}
            onClick={onSave}
            label={I18n.get.actions.save}
            color="success"
          >
            <SaveIcon />
          </FloatingButton>
          {loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </>
      )}
      <FloatingButton
        fabProps={{
          disabled: options?.cancelButton?.disabled,
        }}
        onClick={onCancel}
        label={I18n.get.actions.cancel}
        color="error"
      >
        <CloseIcon />
      </FloatingButton>
    </div>
  );
};

export default FormActions;
