import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

// Custom.
// import VoTheme from "@vocollege/theme";

interface FloatingButtonType {
  className?: string;
  label: string;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  actions?: FloatingButtonSpeedDialAction[];
  //   children: React.ReactElement;
  children: any;
  actionsDirection?: SpeedDialProps["direction"];
  float?: "left" | "right";
  tooltipPlacement?: "top" | "right" | "bottom" | "left";
  fabProps?: object;
  onClick?: any;
}

interface FloatingButtonSpeedDialAction {
  name: string;
  label: string;
  icon: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    error: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
    },
    warning: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    info: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.info.dark,
      },
    },
    success: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.success.dark,
      },
    },
    margin: {
      margin: theme.spacing(2),
    },
    pullLeft: {
      float: "left",
    },
    pullRight: {
      float: "right",
    },
  })
);

const FloatingButton: React.FC<FloatingButtonType> = (props) => {
  const {
    className,
    children,
    label,
    color,
    actions,
    actionsDirection,
    float,
    tooltipPlacement,
    fabProps,
    onClick,
  } = props;
  const classes = useStyles();

  const buttonColor: FloatingButtonType["color"] = color || "primary";
  const actionItems: FloatingButtonType["actions"] = actions || [];

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    action: string | null = null
  ) => {
    handleClose();
    onClick(action);
  };

  return (
    <>
      {actionItems.length === 0 && (
        <Tooltip title={label} placement={tooltipPlacement || "left"}>
          <span>
            <Fab
              onClick={(event) => handleClick(event)}
              className={clsx(
                classes.margin,
                classes[buttonColor],
                { [classes.pullLeft]: float === "left" },
                { [classes.pullRight]: float === "right" },
                className
              )}
              {...fabProps}
            >
              {children}
            </Fab>
          </span>
        </Tooltip>
      )}
      {actionItems.length > 0 && (
        <SpeedDial
          ariaLabel={label}
          className={clsx(classes.margin, className)}
          icon={<SpeedDialIcon icon={children[0]} openIcon={children[1]} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={actionsDirection}
          FabProps={{ className: classes[buttonColor], ...fabProps }}
        >
          {actionItems.map((action: FloatingButtonSpeedDialAction) => (
            <SpeedDialAction
              key={action.label}
              icon={action.icon}
              tooltipTitle={action.label}
              tooltipPlacement={tooltipPlacement || "top"}
              onClick={(event) => handleClick(event, action.name)}
              FabProps={{ color: "inherit", ...fabProps }}
            />
          ))}
        </SpeedDial>
      )}
    </>
  );
};

export default FloatingButton;
