import React from "react";
import Select, { SelectProps } from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";

// Custom.
import { useStyles } from "./styles";

export interface VoSelectFieldProps {
  availableValues: VoSelectFieldAvailableValue[];
  fullWidth?: boolean;
  required?: boolean;
  error?: boolean;
  label?: string;
  name?: string;
  value?: string;
  helperText?: string;
  SelectProps: SelectProps;
  onChange?: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
}

export interface VoSelectFieldAvailableValue {
  label: string;
  value: string;
}

const VoSelectField: React.FC<VoSelectFieldProps> = (props) => {
  const {
    availableValues,
    fullWidth,
    required,
    error,
    label,
    helperText,
    SelectProps,
  } = props;
  const classes = useStyles();

  return (
    <FormControl
      error={error}
      variant="filled"
      required={required}
      className={clsx(classes.formControl, {
        [classes.fullWidth]: fullWidth,
        [classes.error]: error,
      })}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        {...SelectProps}
        classes={{ root: classes.root, select: classes.select }}
      >
        {availableValues &&
          availableValues.map((v: VoSelectFieldAvailableValue, i: number) => (
            <MenuItem key={i} value={v.value}>
              {v.label}
            </MenuItem>
          ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default VoSelectField;
