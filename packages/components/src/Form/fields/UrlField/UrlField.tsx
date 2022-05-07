import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

// Custom.
import { createSlug2 } from "@vocollege/app";
import VoTextField from "VoTextField";
import { FormFieldUrlFieldProps } from "../../global";
import { useStyles } from "./styles";

let typingTimer: number;

const UrlField: React.FC<FormFieldUrlFieldProps> = (props) => {
  const {
    name,
    label,
    value,
    overrideValue,
    required,
    onChange,
    helperText,
    notNew,
    fieldLock = true,
  } = props;
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState("");
  const [fieldLocked, setFieldLocked] = useState(fieldLock);
  const [firstLoad, setFirstLoad] = useState(true);

  // Methods.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!onChange) {
      return;
    }
    setFieldValue(value);
    clearTimeout(typingTimer);
    typingTimer = window.setTimeout(() => {
      let newValue = createSlug2(value);
      onChange(newValue);
      setFieldValue(newValue);
    }, 1000);
  };

  // Effects.

  useEffect(() => {
    if (fieldLocked && !firstLoad) {
      clearTimeout(typingTimer);
      typingTimer = window.setTimeout(() => {
        let newValue = createSlug2(overrideValue || "");
        setFieldValue(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }, 500);
    }
    setFirstLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrideValue]);

  useEffect(() => {
    setFieldValue(value || "");
  }, [value]);

  useEffect(() => {
    if (fieldLock) {
      setFieldLocked(!notNew);
    }
  }, [notNew]);

  return (
    <div className={classes.root}>
      <VoTextField
        name={name}
        label={label}
        value={fieldValue}
        onChange={handleChange}
        variant="filled"
        fullWidth
        type="text"
        required={required}
        disabled={fieldLocked}
        helperText={fieldLocked ? helperText : ""}
        inputProps={{
          className: classes.fieldInput,
          autoComplete: "off",
        }}
      />
      <IconButton
        className={classes.editButton}
        aria-label="edit url value"
        onClick={() => setFieldLocked(!fieldLocked)}
        size="large">
        {fieldLocked && <LockIcon />}
        {!fieldLocked && <LockOpenIcon />}
      </IconButton>
    </div>
  );
};

export default UrlField;
