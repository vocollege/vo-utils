import React from "react";
import Fab from "@mui/material/Fab";
import clsx from "clsx";
import Tooltip from "@mui/material/Tooltip";
import SpeedDial, { SpeedDialProps } from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

// Custom.
// import VoTheme from "@vocollege/theme";
import { useStyles } from "./styles";

interface FloatingButtonType {
  className?: string;
  label: string;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  actions?: FloatingButtonSpeedDialAction[];
  //   children: React.ReactElement;
  children: React.ReactNode;
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

  const getIcon = (index: number) => {
    const arrayChildren = React.Children.toArray(children);
    return arrayChildren[index];
    // if (children) {
    //   return React.Children[0];
    //   // return React.isValidElement(children[0]) ? children[0] : <></>;
    // }
    // return <></>;
  };

  return (
    <div>
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
          icon={<SpeedDialIcon icon={getIcon(0)} openIcon={getIcon(1)} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={actionsDirection}
          FabProps={{ className: buttonColor, ...fabProps }}
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
    </div>
  );
};

export default FloatingButton;
