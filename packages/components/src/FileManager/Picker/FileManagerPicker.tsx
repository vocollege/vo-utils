import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import clsx from "clsx";

// Custom.
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { useStyles } from "./styles";
import { FileManagerPickerProps, FileManagerFolderElement } from "../global";
import FileManagerDialog from "../Dialog";

const FileManagerPicker: React.FC<FileManagerPickerProps> = (props) => {
  const { className, onSelect, filetypes } = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={clsx(classes.root, className)}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setDialogOpen(true)}
        size="small"
        startIcon={<FindInPageIcon />}
      >
        {I18n.get.entities.label.search}
      </Button>
      <FileManagerDialog
        open={dialogOpen}
        title={I18n.get.docs.label.selectFile}
        onChange={onSelect}
        onCancel={() => setDialogOpen(false)}
        filetypes={filetypes}
      />
    </div>
  );
};

export default FileManagerPicker;
