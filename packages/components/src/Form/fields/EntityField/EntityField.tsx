import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

// Custom.
import VoTextField from "@/VoTextField";
import { EntityFieldProps, EntityPickerItem } from "@/Form/global";
import EntityPicker from "../EntityPicker";
import { useStyles } from "./styles";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

const EntityField: React.FC<EntityFieldProps> = (props) => {
  const {
    name,
    label,
    value,
    onChange,
    onReset,
    createCallback,
    createCallbackLabel,
    // types,
    // primaryField,
    fields,
    required,
    renderFieldValue,
    dialog,
    overrideValue,
    textfieldProps,
  } = props;
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState<any>("");

  // Methods.

  const handleSelect = (item: EntityPickerItem) => {
    if (onChange) {
      onChange(item);
    }
  };

  const resetField = () => {
    setFieldValue("");
    if (onReset) {
      onReset();
    }
  };

  const setValue = (newValue: any) => {
    if (renderFieldValue) {
      setFieldValue(renderFieldValue(newValue));
    } else if (newValue) {
      if (typeof newValue === "string") {
        setFieldValue(newValue);
      } else {
        let titleField = "title";
        let type = newValue.type.toLowerCase();
        if (fields) {
          titleField = fields[type].title;
        }
        let title = newValue[titleField] || newValue.title;
        setFieldValue(`${newValue.id} - ${title} - ${type}`);
      }
    }
  };

  // Effects.

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    if (overrideValue) {
      setValue(overrideValue);
      if (onChange) {
        onChange(overrideValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrideValue]);

  return (
    <div className={classes.root}>
      <div className={classes.fieldWrapper}>
        <VoTextField
          {...textfieldProps}
          name={name}
          label={label}
          value={fieldValue}
          variant="filled"
          fullWidth
          type="text"
          required={required}
          disabled
          className={classes.field}
          inputProps={{ className: classes.fieldInput }}
        />
        {value && (
          <IconButton
            className={classes.resetButton}
            aria-label="clear entity field"
            onClick={() => resetField()}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.actions}>
        {createCallback && (
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => createCallback()}
            size="small"
          >
            {createCallbackLabel || I18n.get.actions.create}
          </Button>
        )}
        <EntityPicker
          className={classes.button}
          dialog={{
            onSelect: handleSelect,
            ...dialog,
            // types: types,
            // primaryField: primaryField,
            open: false,
          }}
        />
      </div>
    </div>
  );
};

export default EntityField;
