import React from "react";
import TextField, { FilledTextFieldProps } from "@material-ui/core/TextField";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@material-ui/core/TextareaAutosize";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

// Custom.
import { stylesReddit } from "@vocollege/theme";
import { useStyles } from "./styles";

const useStylesReddit = makeStyles(() => stylesReddit);

const VoTextArea: React.FC<TextareaAutosizeProps> = React.forwardRef(
  (props, ref) => {
    const classesReddit = useStylesReddit();
    const classes = useStyles();
    return (
      <TextareaAutosize
        ref={ref}
        className={clsx(classes.root, classesReddit.root)}
        maxRows={4}
        {...props}
      />
    );
  }
);

export default VoTextArea;
