import React, { useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Custom.

import VoTextField from "VoTextField";
import { I18n } from "@vocollege/app";
import { FormFieldLocationProps } from "../../global";
import { useStyles } from "./styles";
import { useStyles as useStylesForm } from "../../styles";

const reducer = (state: any, action: any) => {
  const { field, value } = action;
  if (!action.field) {
    return action.value;
  }
  return { ...state, [field]: value };
};

const initialState = {
  latitude: "",
  longitude: "",
};

const Location: React.FC<FormFieldLocationProps> = (props) => {
  const { label, value, required, onChange } = props;
  const classes = useStyles();
  const classesForm = useStylesForm();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Methods.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ field: name, value: value });

    if (onChange) {
      let newState = { ...state };
      newState[name] = value;
      onChange(newState);
    }
  };

  const isValid = () => {
    if (required) {
      return state.latitude !== "" && state.longitude !== "";
    }
    return true;
  };

  // Effects.

  useEffect(() => {
    dispatch({
      value: { latitude: value?.latitude, longitude: value?.longitude },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={classesForm.fieldRoot}>
      <div className={classesForm.fieldHead}>
        <Typography
          variant="subtitle1"
          component="label"
          className={classesForm.fieldHeadLabel}
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
            >
              *
            </span>
          )}
        </Typography>
      </div>
      <Grid container spacing={2} className={classes.fields}>
        <Grid item xs={6}>
          <VoTextField
            name="latitude"
            label={I18n.get.form.labels.latitude}
            value={state.latitude}
            onChange={handleChange}
            variant="filled"
            fullWidth
            type="number"
            required={required}
            error={!isValid()}
          />
        </Grid>
        <Grid item xs={6}>
          <VoTextField
            name="longitude"
            label={I18n.get.form.labels.longitude}
            value={state.longitude}
            onChange={handleChange}
            variant="filled"
            fullWidth
            type="number"
            required={required}
            error={!isValid()}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Location;
