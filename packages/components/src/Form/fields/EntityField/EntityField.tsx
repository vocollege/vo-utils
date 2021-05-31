import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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
    types,
    primaryField,
    fields,
    required,
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

  // Effects.

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        setFieldValue(value);
      } else {
        let titleField = "title";
        let type = value.type.toLowerCase();
        if (fields) {
          titleField = fields[type].title;
        }
        let title = value[titleField] || value.title;
        setFieldValue(`${value.id} - ${title} - ${type}`);
      }
    }
  }, [value]);

  return (
    <div className={classes.root}>
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
      {value !== "" && (
        <IconButton
          className={classes.resetButton}
          aria-label="clear entity field"
          onClick={() => resetField()}
        >
          <CloseIcon />
        </IconButton>
      )}
      <EntityPicker
        className={classes.button}
        dialog={{
          onSelect: handleSelect,
          types: types,
          primaryField: primaryField,
          open: false,
        }}
      />
    </div>
  );
};

export default EntityField;
