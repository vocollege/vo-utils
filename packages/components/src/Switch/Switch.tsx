import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiSwitch from "@material-ui/core/Switch";
import clsx from "clsx";

// Custom.
import { useStyles } from "./styles";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  boolean?: false;
  size?: "small" | "medium";
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { checked, onChange, label, name, boolean, size = "medium" } = props;
  const classes = useStyles();
  return (
    <FormGroup row className={clsx(classes.root, classes[size])}>
      <FormControlLabel
        control={
          <MuiSwitch checked={checked} onChange={onChange} name={name} />
        }
        label={label}
        className={classes.label}
      />
    </FormGroup>
  );
};

export default Switch;
