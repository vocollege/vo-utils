import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

// Custom.
import VoTextField from "VoTextField";
import { EntityFieldProps, EntityPickerItem } from "Form/global";
import EntityPicker from "../EntityPicker";
import { useStyles } from "./styles";

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

  // const handleCreateClick = () => {
  //   if (createCallback) {
  //     createCallback();
  //   }
  // };

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
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.actions}>
        {createCallback && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => createCallback()}
            size="small"
          >
            {createCallbackLabel}
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
