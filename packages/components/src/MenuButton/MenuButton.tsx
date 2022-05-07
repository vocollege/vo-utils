import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";

// Custom.
import { useStyles } from "./styles";

export interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const { open, onClick } = props;
  const classes = useStyles();
  return (
    <IconButton
      color="primary"
      aria-label="main menu"
      className={clsx(classes.root, { [classes.opened]: open })}
      onClick={onClick}
      size="large">
      <span className={clsx(classes.bar, classes.bar1)}></span>
      <span className={clsx(classes.bar, classes.bar2)}></span>
      <span className={clsx(classes.bar, classes.bar3)}></span>
    </IconButton>
  );
};

export default MenuButton;
