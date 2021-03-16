import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

// Custom.
import { useStylesReddit } from "../styles/reddit";

const VoTextField: React.FC<TextFieldProps> = (props) => {
  const classes = useStylesReddit();
  return (
    <TextField
      InputProps={
        { classes, disableUnderline: true } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
};

export default VoTextField;
