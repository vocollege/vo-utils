import React from "react";
import TextField, { FilledTextFieldProps } from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
        inputRef={ref}
        InputLabelProps={{
          classes: {
            root: classesTextField.inputLabelRoot,
          },
        }}
        InputProps={
          {
            classes,
            disableUnderline: true,
          } as Partial<OutlinedInputProps>
        }
        {...props}
      />
    );
  }
);

export default VoTextField;
