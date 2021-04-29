import React, { useState } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import FindInPageIcon from "@material-ui/icons/FindInPage";

// Custom.
import { useStyles } from "./styles";
import { EntityPickerProps } from "Form/global";
import { I18n } from "@vocollege/app";
import EntityPickerDialog from "./EntityPickerDialog";

const EntityPicker: React.FC<EntityPickerProps> = (props) => {
  const { className, dialog } = props;
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
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        size="small"
        startIcon={<FindInPageIcon />}
      >
        {I18n.get.entities.label.search}
      </Button>
      <EntityPickerDialog {...dialog} open={open} onClose={handleClose} />
    </div>
  );
};

export default EntityPicker;
