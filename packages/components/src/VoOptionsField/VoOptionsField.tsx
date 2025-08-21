import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

import Switch from "@/Switch";
import VoRadioField from "@/VoRadioField";
import { FormFieldGridBreakpointValues } from "../Form/global";

export interface OptionField {
  label: string;
  name: string;
  type: string;
  values?: any[];
  defaultValue: any;
  inputType:
    | "switch"
    | "radio"
    | "info"
    | "hidden"
    | "empty";
  helperText?: string;
  grid?: {
    xs?: FormFieldGridBreakpointValues;
    sm?: FormFieldGridBreakpointValues;
    md?: FormFieldGridBreakpointValues;
    lg?: FormFieldGridBreakpointValues;
    xl?: FormFieldGridBreakpointValues;
  };
}

export interface VoOptionsFieldProps {
  name: string;
  items: any[];
  onChange?: (field: any, value: any) => void;
  fields: OptionField[];
}

const VoOptionsField: React.FC<VoOptionsFieldProps> = React.forwardRef((props, ref) => {
  const {
    name,
    items,
    onChange,
    fields,
  } = props;

  const handleChange = (field, value) => {
    const i = items?.findIndex((v) => v.name === field.name && v.type == field.type);
    let newState = JSON.parse(JSON.stringify(items)) || [];
    let newValue = typeof value === "string" ? value : JSON.stringify(value);

    try { // make sure the value is transmitted as a json-parsable string
      JSON.parse(newValue);
    } catch (_) {
      newValue = JSON.stringify(newValue);
    }

    if (!i || i != -1) {
      newState[i].value = newValue;
    } else {
      newState.push({
        name: field.name,
        type: field.type,
        value: newValue,
      });
    }
    onChange(name, newState);
  };

  const getField = (field: OptionField) => {
    const i = items?.findIndex((v) => v.name === field.name && v.type === field.type);
    let item = i === -1 || i === null || i === undefined ? {
      name: field.name,
      type: field.type,
      value: field.defaultValue
    } : JSON.parse(JSON.stringify(items[i]));
    try {
      while (typeof item.value === "string") { item.value = JSON.parse(item.value);}
    } catch (_) {}

    switch (field.inputType) {
      case "switch":
        return (<Switch
          checked={item.value}
          onChange={(e) => handleChange(field, e.target.checked)}
          label={field.label}
          name={field.name}
          helperText={field?.helperText || ""}
        />);
      case "info":
        return (
          <Alert severity="info" variant="outlined">
            {field.label}
          </Alert>
      );
      case "radio":
        return (
          <VoRadioField 
            label={field.label}
            name={field.name}
            value={item.value}
            values={field.values}
            onChange={(v) => handleChange(field, v)}
          />
      );
      case "hidden":
        return (
          <input type="hidden" name={field.name} value={item} />
      );
      case "empty":
        return ""; 
    };
    return <div></div>
  } 
  
  return (
    <Box>
      <Grid
        container
        spacing={3}
        sx={(theme: any) => ({
          "& $gridItem": {
            "&$gridItemHidden": {
              padding: 0,
            },
          },
        })}
      >
      {fields?.map(
        (field: OptionField, fieldIndex: number) => {
          let fieldElement = getField(field);
          if (fieldElement === "") {
            return "";
          }
          return (
            fieldElement && (
              <Grid
                key={fieldIndex}
                item
                {...field.grid}
              >
                {fieldElement}
              </Grid>
            )
          );
        })}
      </Grid>
    </Box>
  );
});

export default VoOptionsField;
