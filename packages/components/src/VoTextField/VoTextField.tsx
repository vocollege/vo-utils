import React from "react";
import TextField, { FilledTextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import makeStyles from "@mui/styles/makeStyles";

// Custom.
import { stylesReddit } from "@vocollege/theme";
import { useStyles as useStylesTextField } from "./styles";

const useStylesReddit = makeStyles(() => stylesReddit);

const VoTextField: React.FC<FilledTextFieldProps> = React.forwardRef(
  (props, ref) => {
    const classes = useStylesReddit();
    const classesTextField = useStylesTextField();
    return (
      <TextField
        {...props}
        inputRef={ref}
        InputLabelProps={{
          classes: {
            root: classesTextField.inputLabelRoot,
          },
          ...props?.InputLabelProps,
        }}
        InputProps={
          {
            classes,
            disableUnderline: true,
            ...props?.InputProps,
          } as Partial<OutlinedInputProps>
        }
      />
    );
  },
);

export default VoTextField;
