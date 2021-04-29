import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import CloseIcon from "@material-ui/icons/Close";

// Custom.

import FileManagerDialog from "FileManager/Dialog";
import { useStyles } from "./styles";
import { useStyles as useStylesForm } from "../../styles";
import { I18n } from "@vocollege/app";
import { FileFieldProps } from "../../global";
import { FileManagerFolderElement } from "FileManager/global";

const FileField: React.FC<FileFieldProps> = (props) => {
  const { label, value, required, onChange, filetypes, multiple } = props;
  const classes = useStyles();
  const classesForm = useStylesForm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState<FileManagerFolderElement[]>([]);

  // Methods.

  const handleChange = (elements: FileManagerFolderElement[]) => {
    let newFiles;
    if (!multiple) {
      newFiles = elements;
    } else {
      newFiles = files?.concat(elements);
    }
    setFiles(newFiles);
    if (onChange) {
      onChange(newFiles);
    }
  };

  const handleClear = () => {
    setFiles([]);
    if (onChange) {
      onChange([]);
    }
  };

  // Effects.

  useEffect(() => {
    if (value) {
      setFiles(value);
    }
  }, [value]);

  return (
    <div className={classesForm.fieldRoot}>
      <div className={classesForm.fieldHead}>
        {label && (
          <Typography
            variant="subtitle1"
            component="label"
            className={classesForm.fieldHeadLabel}
          >
            {label}
            {required && (
              <span
                aria-hidden="true"
                className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
              >
                *
              </span>
            )}
          </Typography>
        )}
        {files.length > 0 && (
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleClear}
            classes={{ root: classes.clearButton }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setDialogOpen(true)}
          size="small"
          startIcon={<FindInPageIcon />}
        >
          {I18n.get.entities.label.search}
        </Button>
      </div>
      {files.length > 0 &&
        files.map((file: FileManagerFolderElement, i: number) => (
          <div key={i} className={classes.fileDetailsWrapper}>
            <div className={classes.fileDetails}>
              <Typography variant="subtitle2">
                <strong>{I18n.get.form.labels.title}:</strong> {file.title}
              </Typography>
              <Typography variant="subtitle2">
                <strong>{I18n.get.docs.label.filename}:</strong> {file.filename}
              </Typography>
              <Typography variant="subtitle2">
                <strong>{I18n.get.docs.label.filetype}:</strong> {file.filetype}
              </Typography>
              <Typography variant="subtitle2">
                <strong>{I18n.get.docs.label.filesize}:</strong>{" "}
                {(file.filesize / 1000000).toFixed(2)} MB
              </Typography>
              <Typography variant="subtitle2">
                <strong>{I18n.get.misc.id}:</strong> {file.id}
              </Typography>
            </div>
            <img
              className={classes.fileThumbnail}
              src={`${file.url}?d=100x100`}
              alt={file.title}
            />
          </div>
        ))}
      <FileManagerDialog
        open={dialogOpen}
        title={I18n.get.docs.label.selectFile}
        onChange={handleChange}
        onCancel={() => setDialogOpen(false)}
        filetypes={filetypes}
      />
    </div>
  );
};

export default FileField;
