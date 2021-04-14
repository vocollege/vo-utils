import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Custom.
import { VoTextField } from "@vocollege/components";
import { EntityFieldProps, EntityPickerItem } from "../../global";
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
    required,
  } = props;
  const classes = useStyles();

  // Methods.

  const handleSelect = (item: EntityPickerItem) => {
    if (onChange) {
      onChange(item);
    }
  };

  const resetField = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className={classes.root}>
      <VoTextField
        name={name}
        label={label}
        value={value}
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
        }}
      />
    </div>
  );
};

export default EntityField;
