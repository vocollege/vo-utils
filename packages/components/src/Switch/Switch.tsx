import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiSwitch from "@material-ui/core/Switch";

// Custom.
import { useStyles } from "./styles";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  boolean?: false;
}

const Switch: React.FC<SwitchProps> = (props) => {
  const { checked, onChange, label, name, boolean } = props;
  const classes = useStyles();
  return (
    <FormGroup row className={classes.root}>
      <FormControlLabel
        control={
          <MuiSwitch checked={checked} onChange={onChange} name={name} />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default Switch;
