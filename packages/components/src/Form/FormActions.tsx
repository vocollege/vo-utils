import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import PublishIcon from "@material-ui/icons/Publish";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Fade from "@material-ui/core/Fade";

// Custom
import FloatingButton from "FloatingButton";
import { I18n } from "@vocollege/app";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formActionsWrapper: {
      alignItems: "flex-end",
      bottom: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      right: theme.spacing(2),
      "& > .MuiSpeedDial-root:not(:last-child), > .MuiButtonBase-root:not(:last-child)": {
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
      backgroundColor: fade(theme.palette.background.paper, 0.8),
      position: "fixed",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
  })
);

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
