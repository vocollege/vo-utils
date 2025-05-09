import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Switch from "@/Switch";
import { FormFieldGridBreakpointValues } from "../Form/global";

export interface OptionField {
  label: string;
  name: string;
  type: string;
  values?: any[];
  defaultValue: any;
  inputType:
    | "switch"
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
 
  const getItemIndex = (field) => {
    if (!items || items.length < 1) {
      return -1;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].name === field.name && items[i].type === field.type) {
        return i;
      }
    }
    return -1;
  };

  const handleChange = (field, value) => {
    const itemIndex = getItemIndex(field);
    const jsonValue = JSON.stringify(value);
    let new_items = JSON.parse(JSON.stringify(items));

    if (itemIndex !== -1) {
      new_items[itemIndex].value = jsonValue;
    } else {
      new_items.push({
        name: field.name,
        type: field.type,
        value: jsonValue,
      });
    }
    onChange(name, new_items);
  }

  const getField = (field: OptionField) => {
    const i = getItemIndex(field);
    const item = i === -1 ? {
      name: field.name,
      type: field.type,
      value: field.defaultValue
    } : items[i];

    switch (field.inputType) {
      case "switch":
        return (<Switch
          checked={JSON.parse(item.value)}
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
