import React, { useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BackupIcon from "@material-ui/icons/Backup";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import clsx from "clsx";

// Custom.
import { FileManagerActionsProps, FileManagerAction } from "../global";
import { useStyles } from "./styles";

const availableActions: FileManagerAction[] = [
  {
    icon: <BusinessCenterIcon />,
    name: "Portfolio",
    label: "Create portfolio",
  },
  { icon: <BackupIcon />, name: "File", label: "Upload file" },
  { icon: <CreateNewFolderIcon />, name: "Folder", label: "Create folder" },
];

export default function FileManagerActions(props: FileManagerActionsProps) {
  const { actions, onClick, className } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (action: string | null) => {
    if (action) {
      onClick(action);
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getActions = () => {
    if (!actions) {
      return availableActions;
    }
    return availableActions.filter(
      (action: FileManagerAction) => actions.indexOf(action.name) > -1
    );
  };

  return (
    <SpeedDial
      ariaLabel="portfolio folder file actions"
      classes={{ actions: classes.actions }}
      className={clsx(classes.speedDial, className)}
      icon={<SpeedDialIcon />}
      onClose={() => handleClose(null)}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {getActions().map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.label}
          onClick={() => handleClose(action.name)}
        />
      ))}
    </SpeedDial>
  );
}
