import React, { useState } from "react";
import clsx from "clsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FindInPageIcon from "@mui/icons-material/FindInPage";

// Custom.
import { useStyles } from "./styles";
import { EntityPickerProps } from "Form/global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import EntityPickerDialog from "./EntityPickerDialog";

const EntityPicker: React.FC<EntityPickerProps> = (props) => {
  const {
    className,
    dialog = { open: false, types: [] },
    disableButtonLabel,
    buttonLabel,
    buttonColor,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Methods.

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={clsx(classes.root, className)}>
      {disableButtonLabel && (
        <IconButton
          color={buttonColor || "success"}
          onClick={handleOpen}
          size="small"
          title={I18n.get.entities.label.search}
        >
          <FindInPageIcon />
        </IconButton>
      )}
      {!disableButtonLabel && (
        <Button
          variant="contained"
          color={buttonColor || "success"}
          onClick={handleOpen}
          size="small"
          startIcon={
            buttonLabel && typeof buttonLabel !== "string" ? undefined : (
              <FindInPageIcon />
            )
          }
        >
          {buttonLabel || I18n.get.entities.label.search}
        </Button>
      )}
      <EntityPickerDialog {...dialog} open={open} onClose={handleClose} />
    </div>
  );
};

export default EntityPicker;
