import React from "react";
import Select, { SelectProps } from "@mui/material/Select";
import clsx from "clsx";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Checkbox,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";

// Custom.
import { useStyles } from "./styles";

export interface VoSelectFieldProps {
  availableValues: VoSelectFieldOption[];
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
    }>,
  ) => void;
}

export interface VoSelectFieldValue {
  label: string;
  value: any;
}
export interface VoSelectFieldGroup {
  group: string;
  options: VoSelectFieldOption[];
}

export type VoSelectFieldOption = VoSelectFieldValue | VoSelectFieldGroup;

export function isVoSelectFieldGroup(
  option: VoSelectFieldOption,
): option is VoSelectFieldGroup {
  return "group" in option && "options" in option;
}

export function isVoSelectFieldValue(
  option: VoSelectFieldOption,
): option is VoSelectFieldValue {
  return "label" in option && "value" in option;
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
  const currentValue = SelectProps.value;

  // Methods.

  const getMenuItems = (values: any, indentLevel: number = 0) => {
    if (!values) {
      return null;
    }
    return values.map((v: VoSelectFieldOption, key: number) => {
      if (isVoSelectFieldGroup(v)) {
        return [
          <ListSubheader
            sx={(theme: any) => ({
              fontWeight: "800",
              fontSize: `${theme.typography.body1.fontSize} !important`,
              paddingLeft: `${indentLevel + 1}rem`,
            })}
          >
            {v.group}
          </ListSubheader>,
          getMenuItems(v.options, indentLevel + 1),
        ];
      } else {
        return (
          <MenuItem key={key} value={v.value}>
            {SelectProps && SelectProps.multiple && (
              <Checkbox
                checked={
                  Array.isArray(SelectProps?.value) &&
                  SelectProps.value.indexOf(v.value) > -1
                }
              />
            )}
            <ListItemText
              primary={v.label}
              primaryTypographyProps={{
                sx: (theme) => ({
                  fontSize: `${theme.typography.body1.fontSize} !important`,
                  paddingLeft: `${indentLevel}rem`,
                }),
              }}
            />
          </MenuItem>
        );
      }
    });
  };

  const getSelected = (
    data: VoSelectFieldOption[],
  ): VoSelectFieldValue | undefined => {
    return data.reduce<VoSelectFieldValue | undefined>((acc, current) => {
      if (acc) {
        return acc;
      }
      if (isVoSelectFieldGroup(current)) {
        return getSelected(current.options);
      } else {
        return current.value == currentValue ? current : undefined;
      }
    }, undefined);
  };
  const renderValue = (s: any) => {
    const selected = getSelected(availableValues);
    return (
      <Typography
        sx={(theme: any) => ({
          overflow: "hidden",
        })}
      >
        {selected.label}
      </Typography>
    );
  };

  return (
    <FormControl
      error={error}
      variant="filled"
      required={required}
      className={clsx(classes.formControl, {
        [classes.fullWidth]: fullWidth,
        [classes.error]: error,
      })}
      size="small"
    >
      {label && (
        <InputLabel required={SelectProps.required}>{label}</InputLabel>
      )}
      <Select
        renderValue={renderValue}
        {...SelectProps}
        classes={{
          select: classes.select,
        }}
        MenuProps={MenuProps}
      >
        {getMenuItems(availableValues)}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default VoSelectField;
