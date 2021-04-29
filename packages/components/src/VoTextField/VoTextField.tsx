import React from "react";
import TextField, { FilledTextFieldProps } from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Custom.
import { stylesReddit } from "@vocollege/theme";

const useStylesReddit = makeStyles(() => stylesReddit);

const VoTextField: React.FC<FilledTextFieldProps> = React.forwardRef(
  (props, ref) => {
    const classes = useStylesReddit();
    return (
      <TextField
        inputRef={ref}
        InputProps={
          { classes, disableUnderline: true } as Partial<OutlinedInputProps>
        }
        {...props}
      />
    );
  }
);

export default VoTextField;
