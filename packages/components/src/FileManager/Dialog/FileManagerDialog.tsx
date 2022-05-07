import React, { useState } from "react";
import clsx from "clsx";

// Custom.

import FileManager from "../index";
import {
  GET_PORTFOLIOS,
  GET_FOLDER_ELEMENTS,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  CREATE_FOLDER,
  UPDATE_FOLDER,
  DELETE_FOLDER,
  CREATE_FILE,
  UPDATE_FILE,
  DELETE_FILE,
} from "@vocollege/app";
import { FileManagerFolderElement, FileManagerDialogProps } from "../global";
import EditDialog from "../../EditDialog";
import { useStyles } from "./styles";

const FileManagerDialog: React.FC<FileManagerDialogProps> = (props) => {
  const {
    className,
    title,
    // label,
    // value,
    // required,
    onChange,
    onCancel,
    filetypes,
    multiple,
    open,
    files = [],
    client,
  } = props;
  const classes = useStyles();
  const [portfolioId, setPortfolioId] = useState<null | string>(null);
  const [folderId, setFolderId] = useState<null | string>(null);
  const [operation, setOperation] = useState(GET_PORTFOLIOS);
  const [category, setCategory] = useState("portfolios");

  // Methods.

  const handleDoubleClick = (element: FileManagerFolderElement) => {
    switch (element.__typename) {
      case "Portfolio":
        setPortfolioId(element.id);
        setOperation(GET_FOLDER_ELEMENTS);
        setCategory("folderElements");
        break;
      case "Folder":
        setFolderId(element.id);
        break;
      default:
        // setDialogOpen(false);
        if (onCancel) {
          onCancel();
        }
        let newFiles;
        if (!multiple) {
          newFiles = [element];
        } else {
          newFiles = files?.concat(element);
        }
        if (onChange) {
          onChange(newFiles);
        }
        break;
    }
  };

  const handleBreadcrumbClick = (value: string, type: string) => {
    switch (type) {
      case "Portfolio":
        setPortfolioId(value);
        setFolderId(null);
        break;
      case "Folder":
        setFolderId(value);
        break;
      default:
        setPortfolioId(null);
        setFolderId(null);
        setOperation(GET_PORTFOLIOS);
        setCategory("portfolios");
        break;
    }
  };

  // Effects.

  // This is required if uploading through Laravel
  // useEffect(() => {
  //   VoDocs.init();
  // }, []);

  return (
    <EditDialog
      className={clsx(classes.dialog, className)}
      open={open}
      onCancel={onCancel}
      title={title}
      disableActions
      classes={{ contentRoot: classes.contentRoot }}
    >
      <FileManager
        portfolioId={portfolioId}
        folderId={folderId}
        classes={{
          toolbar: classes.toolbar,
          actions: classes.actions,
        }}
        // client={VoDocs.graphqlClient} // This is required if uploading through Laravel
        onDoubleClick={handleDoubleClick}
        onBreadcrumbClick={handleBreadcrumbClick}
        operations={{
          category: category,
          get: operation,
          createPortfolio: CREATE_PORTFOLIO,
          updatePortfolio: UPDATE_PORTFOLIO,
          deletePortfolio: DELETE_PORTFOLIO,
          createFolder: CREATE_FOLDER,
          updateFolder: UPDATE_FOLDER,
          deleteFolder: DELETE_FOLDER,
          createFile: CREATE_FILE,
          updateFile: UPDATE_FILE,
          deleteFile: DELETE_FILE,
        }}
        filetypes={filetypes}
        client={client}
      />
    </EditDialog>
  );
};

export default FileManagerDialog;
