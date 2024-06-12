import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useMutation } from "@apollo/client";
import { useConfirm } from "material-ui-confirm";
import parse from "html-react-parser";
import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import clsx from "clsx";

// Custom.

import FileManagerFileFormDirectUpload from "@/FileManager/Forms/FileManagerFileFormDirectUpload";
import FileManagerDialog from "@/FileManager/Dialog";
import { useStyles } from "./styles";
import { useStyles as useStylesForm } from "../../styles";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { FileFieldProps } from "../../global";
import { FileManagerFolderElement } from "@/FileManager/global";
import { fakeMutation } from "@vocollege/app/dist/modules/VoApi/graphql";
import { toast } from "react-toastify";
import VoLoader from "@/VoLoader";
import { downloadFile } from "@vocollege/app/dist/modules/VoHelpers";
import VoDocs from "@vocollege/app/dist/modules/VoDocs";
// import VoApi from "@vocollege/app/dist/modules/VoApi";

const FileField: React.FC<FileFieldProps> = (props) => {
  const {
    title,
    label,
    value,
    required,
    onChange,
    filetypes,
    multiple,
    directUpload,
    portfolio,
    operations,
    hideThumbnail,
    simplified,
    client,
    disabled,
  } = props;
  const classes = useStyles();
  const classesForm = useStylesForm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState<FileManagerFolderElement[]>([]);
  const confirm = useConfirm();

  const [deleteFileMutation, { loading: deleteFileLoading }] = useMutation(
    operations?.deleteFile || fakeMutation,
    {
      client: client || undefined,
    }
  );

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

  const handleClear = async () => {
    try {
      if (directUpload) {
        const result = await deleteFile();
      }
      setFiles([]);
      if (onChange) {
        onChange([]);
      }
    } catch (error: any) {
      toast.error(error, { autoClose: 10000 });
    }
  };

  const deleteFile = async () => {
    let description =
      I18n.trans(I18n.get.messages.deleteElement, {
        element: `${label?.toLocaleLowerCase()} <b>"${files[0].filename}"</b>`,
      }) +
      " " +
      `<br /><i>${I18n.get.messages.actionCantBeUndone}</i>`;
    return confirm({
      description: parse(description),
    }).then(async () => {
      let variables = {
        id: files[0].id,
      };
      await deleteFileMutation({
        variables,
      });
    });
  };

  const handleDownloadFile = async (fileId: string) => {
    let url = await VoDocs.getTemporaryFileUrl(fileId);
    downloadFile(url.data);
  };

  // Effects.

  useEffect(() => {
    if (value) {
      setFiles(value);
    }
  }, [value]);

  return (
    <div
      className={clsx(classesForm.fieldRoot, classes.root, {
        [classes.simplified]: simplified,
      })}
    >
      {deleteFileLoading && (
        <div className={classes.loaderWrapper}>
          <VoLoader noOverlay className={classes.loader} />
        </div>
      )}
      <div className={classesForm.fieldHead}>
        {label && (files.length > 0 || !simplified) && (
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
            disabled={disabled}
          >
            <CloseIcon />
          </IconButton>
        )}
        {!directUpload && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDialogOpen(true)}
            size="small"
            startIcon={<FindInPageIcon />}
            disabled={disabled}
          >
            {I18n.get.entities.label.search}
          </Button>
        )}
        {directUpload && files.length === 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDialogOpen(true)}
            size="small"
            startIcon={<BackupIcon />}
            disabled={disabled}
          >
            {I18n.get.actions.upload}
          </Button>
        )}
      </div>
      {files.length > 0 &&
        files.map((file: FileManagerFolderElement, i: number) => (
          <React.Fragment key={i}>
            <div className={classes.fileDetailsWrapper}>
              <div className={classes.fileDetails}>
                {!simplified && (
                  <Typography variant="subtitle2">
                    <strong>{I18n.get.form.labels.title}:</strong> {file.title}
                  </Typography>
                )}
                <Typography variant="subtitle2">
                  <strong>{I18n.get.docs.label.filename}:</strong>{" "}
                  {file.filename}
                </Typography>
                {!simplified && (
                  <Typography variant="subtitle2">
                    <strong>{I18n.get.docs.label.filetype}:</strong>{" "}
                    {file.filetype}
                  </Typography>
                )}
                <Typography variant="subtitle2">
                  <strong>{I18n.get.docs.label.filesize}:</strong>{" "}
                  {(file.filesize / 1000000).toFixed(2)} MB
                </Typography>
                {!simplified && (
                  <Typography variant="subtitle2">
                    <strong>{I18n.get.misc.id}:</strong> {file.id}
                  </Typography>
                )}
              </div>
              {!hideThumbnail && !simplified && (
                <img
                  className={classes.fileThumbnail}
                  src={`${file.url}?d=100x100`}
                  alt={file.title}
                />
              )}
            </div>
            <div className={classes.actions}>
              <IconButton
                aria-label="download"
                color="success"
                size="small"
                onClick={() => handleDownloadFile(file.id)}
                disabled={disabled}
              >
                <CloudDownloadIcon />
              </IconButton>
            </div>
          </React.Fragment>
        ))}
      <FileManagerDialog
        open={!directUpload && dialogOpen}
        title={I18n.get.docs.label.selectFile}
        onChange={handleChange}
        onCancel={() => setDialogOpen(false)}
        filetypes={filetypes}
        client={client}
      />
      <FileManagerFileFormDirectUpload
        title={title}
        open={!!directUpload && dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onChange={(element) => {
          setDialogOpen(false);
          handleChange([element]);
        }}
        operations={{
          create: operations?.createFile,
          update: operations?.updateFile,
        }}
        portfolio={portfolio}
        client={client}
      />
    </div>
  );
};

export default FileField;
