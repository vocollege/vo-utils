import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

// Custom.
import { useStyles } from "./styles";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

export interface CheckboxesProps {
  label?: string;
  values: String[];
  availableValues: CheckboxesAvailableValue[];
  required?: boolean;
  onChange?: (values: String[]) => void;
}

export interface CheckboxesAvailableValue {
  name?: string;
  label?: string;
}

const Checkboxes: React.FC<CheckboxesProps> = (props) => {
  const { label, values, availableValues, required, onChange } = props;
  const [state, setState] = useState<String[]>([]);
  const classes = useStyles();

  // Methods.

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    let checkedValues = [...state];
    if (checked) {
      if (state.indexOf(name) === -1) {
        checkedValues.push(name);
      }
    } else {
      let i = checkedValues.findIndex((v: String) => v === name);

      if (i > -1) {
        checkedValues.splice(i, 1);
      }
    }
    setState(checkedValues);
    if (onChange) {
      onChange(checkedValues);
    }
  };

  // Effects.

  useEffect(() => {
    if (values && Array.isArray(values)) {
      setState(values);
    }
  }, [values]);

  if (!label && !availableValues) {
    return <span></span>;
  }

  return (
    <FormGroup row className={classes.root}>
      {label && (
        <Typography
          variant="subtitle1"
          component="label"
          className={classes.label}
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

      {availableValues &&
        availableValues.map((v: CheckboxesAvailableValue, i: number) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={state.indexOf(v.name || "") > -1}
                onChange={handleChange}
                name={v.name}
              />
            }
            label={v.label}
          />
        ))}
    </FormGroup>
  );
};

export default Checkboxes;
