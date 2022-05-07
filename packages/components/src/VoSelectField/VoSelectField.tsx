import React from "react";
import Select, { SelectProps } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import clsx from "clsx";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
      {label && (
        <InputLabel required={SelectProps.required}>{label}</InputLabel>
      )}
      <Select
        {...SelectProps}
        classes={{
          // root: classes.root,
          select: classes.select,
        }}
        MenuProps={MenuProps}
      >
        {availableValues &&
          availableValues.map((v: VoSelectFieldAvailableValue, key: number) => (
            <MenuItem key={key} value={v.value}>
              {SelectProps && SelectProps.multiple && (
                <Checkbox
                  checked={
                    Array.isArray(SelectProps?.value) &&
                    SelectProps.value.indexOf(v.value) > -1
                  }
                />
              )}
              <ListItemText primary={v.label} />
            </MenuItem>
          ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default VoSelectField;
