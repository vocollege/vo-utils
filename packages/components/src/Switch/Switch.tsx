import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import MuiSwitch from "@mui/material/Switch";
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
  disabled?: boolean;
  helperText?: string;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const {
    checked,
    onChange,
    label,
    name,
    boolean,
    size = "medium",
    disabled = false,
    helperText,
  } = props;
  const classes = useStyles();

  return (
    <FormGroup row className={clsx(classes.root, classes[size])}>
      <FormControlLabel
        control={
          <MuiSwitch
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            name={name}
          />
        }
        label={label || ""}
        className={classes.label}
      />
      {helperText && (
        <Typography component="p" variant="caption">
          {helperText}
        </Typography>
      )}
    </FormGroup>
  );
};

export default Switch;
