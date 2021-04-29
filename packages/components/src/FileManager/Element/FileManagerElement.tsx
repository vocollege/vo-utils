import React, { useEffect, useState } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

// Icons.
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

// Custom.
import { FileManagerElementProps, FileManagerElementAction } from "../global";
import { useStyles } from "./styles";
import FileManagerIcon from "./FileManagerIcon";

let doubleClick = false;

export default function FileManagerElement(props: FileManagerElementProps) {
  const {
    portfolio,
    element,
    baseUrl,
    onSelect,
    onAction,
    onDoubleClick,
    selected,
  } = props;
  const classes = useStyles();
  const [actions, setActions] = useState<string[]>([]);

  const handleSelect = () => {
    if (!onSelect) {
      return;
    }
    // Create a delay in the execution in order to detect if a double click
    // occurred. In this case we don't want to handle the "select" code.
    window.setTimeout(() => {
      if (!doubleClick) {
        if (element.__typename) onSelect(element);
      }
    }, 300);
  };

  const handleDoubleClick = () => {
    doubleClick = true;
    setTimeout(() => {
      doubleClick = false;
    }, 300);
    let url = "";
    switch (element.__typename) {
      case "Portfolio":
        url = `${baseUrl}/portfolio/${element.id}`;
        break;
      case "Folder":
        if (portfolio) {
          url = `${baseUrl}/folder/${element.id}`;
        }
        break;
      default:
        url = element.id;
        break;
    }
    if (onDoubleClick) {
      onDoubleClick(url, element);
    }
  };

  const getActions = () => {
    const actions: FileManagerElementAction[] = ["edit", "delete"];
    if (element.__typename === "File") {
      actions.unshift("download");
    }
    return actions;
  };

  const handleAction = (action: FileManagerElementAction) => {
    if (onAction) {
      onAction(action, element);
    }
  };

  // Effects.

  useEffect(() => {
    setActions(getActions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  return (
    <ButtonBase
      component="div"
      classes={{ root: classes.root }}
      className={clsx({ [classes.selected]: selected })}
      color=""
      focusRipple
      disableRipple
      disableTouchRipple
      focusVisibleClassName={classes.focusVisible}
      title={element.title}
      id={`${element.__typename}-${element.id}`}
      onMouseDown={() => handleSelect()}
      onDoubleClick={() => handleDoubleClick()}
    >
      <FileManagerIcon element={element} classes={{ root: classes.iconRoot }} />
      <Typography component="h6" classes={{ root: classes.titleRoot }}>
        {element.title}
      </Typography>
      {selected && (
        <div className={classes.details}>
          <div className={classes.actions}>
            {actions.indexOf("download") > -1 && (
              <IconButton
                aria-label="download"
                color="inherit"
                size="small"
                onClick={() => handleAction("download")}
              >
                <CloudDownloadIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="edit"
              color="inherit"
              size="small"
              onClick={() => handleAction("edit")}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              color="inherit"
              size="small"
              onClick={() => handleAction("delete")}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      )}
    </ButtonBase>
  );
}
