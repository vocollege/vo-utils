import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useConfirm } from "material-ui-confirm";

// Custom.
import { FormToolbarProps, ValueChangeProps } from "./global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

export default function FormToolbar(props: FormToolbarProps) {
  const { 
    title,

    onSave,
    onSubmit,
    onCancel,
    triggerChange,

    loading,
    options,
    className,
    extraActions,
  } = props;

  const confirm = useConfirm();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  // Methods.

 const showCancelButton = () => {
    if (!onCancel) {
      return false;
    }
    if (options && options.cancelButton) {
      return options.cancelButton.visible != false;
    }
    return true;
  };

  const showSaveButton = () => {
    if (options && options.saveButton) {
      return options.saveButton.visible != false;
    }
    return true;
  }

  const showSubmitButton = () => {
    if (!onSubmit) {
      return false;
    }
    if (options && options.submitButton) {
      return options.submitButton.visible
    }
    return false;
  }

  const addDivider = () => {
    return extraActions || showSubmitButton();
  };

  const handleTriggers = (valueChange: any) => {
    if (triggerChange && valueChange && valueChange.length > 0) {
      valueChange.forEach((v) => triggerChange(v));
    }
  };

  const doSubmit = () => {
    handleTriggers(options?.submitButton?.triggerValueChange);
    onSubmit();
  };

  const handleSubmit = () => { 
    if (onSubmit) {
      if (options && options.submitConfirmDescription) {
        confirm({description: options.submitConfirmDescription}).then(()=>{
          doSubmit();
        }, ()=>{});
      } else {
        doSubmit();
      }
    }
  };

  const handleSave = () => {
    handleTriggers(options?.saveButton?.triggerValueChange);
    if (onSave) {
      onSave();
    }
  };

  const handleCancel = (e) => {
    handleTriggers(options?.cancelButton?.triggerValueChange);
    if (onCancel) {
      onCancel(e);
    }
  };

  const buttonStyle = (theme: any) => {
    return {
      flexShrink: 0,
    };
  };

  const button = (options, defaultTitle, label, color, variant, onClick, Icon) => {
    const disabled = loading || options?.disabled;
    const showLabel = !matchesMd ? !options?.hideLabel : false;
    const title = options?.label || defaultTitle;
    if (showLabel) {
      return <Button
                variant={variant}
                color={color}
                aria-label={label}
                startIcon={<Icon />}
                sx={buttonStyle}
                onClick={onClick}
                disabled={disabled}
                >
                {title}
                </Button>;
     } else {
        return <IconButton 
                sx={buttonStyle}
                color={color}
                aria-label={label}
                onClick={onClick}
                size="small"
                disabled={disabled}
                title={title}
                >
                <Icon />
                </IconButton>;
     }
  };

  return (
    <Toolbar className={className}>
      {title && title !== "" && (
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      )}
      <Box 
        sx={(theme: any) => ({ 
          flexGrow: 1,
          marginLeft: theme.spacing(1.5),
        })}
      ></Box>
      <Box
        sx={(theme: any) => ({
          display: "flex",
          gap: theme.spacing(1),
          justifyContent: "flex-end",
        })}
      >
        {extraActions}
        {showSubmitButton() && button(options?.submitButton,
                                   I18n.get.actions.submit,
                                   "submit",
                                   "success",
                                   "outlined",
                                   handleSubmit,
                                   SendIcon,
              )}
        {addDivider() && (
          <Divider orientation="vertical" flexItem />
        )}
        {showSaveButton() && button(options?.saveButton,
                                  I18n.get.actions.save,
                                  "save item",
                                  "success",
                                  "contained",
                                  handleSave,
                                  SaveIcon,
               )}
        {showCancelButton() && button(options?.cancelButton,
                                  I18n.get.actions.cancel,
                                  "cancel",
                                  "success",
                                  "outlined",
                                  handleCancel,
                                  CloseIcon,
                )}
      </Box>
    </Toolbar>
  );
}
