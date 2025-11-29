import React from "react";
import Typography from "@mui/material/Typography";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

// Custom.
import { stylesReddit } from "@vocollege/theme";
import { useStyles } from "./styles";

export interface VoTextAreaProps extends TextareaAutosizeProps {
  label?: string;
  error?: boolean;
  helperText?: string;
}

const useStylesReddit = makeStyles(() => createStyles(stylesReddit));

const VoTextArea = React.forwardRef<HTMLTextAreaElement, VoTextAreaProps>(
  (props, ref) => {
    const { label, error, helperText, required, ...rest } = props;
    const classesReddit = useStylesReddit();
    const classes = useStyles();
    return (
      <FormControl sx={{ width: "100%" }}>
        {label && (
          <div
            className={clsx(classes.labelWrapper, { [classes.error]: error })}
          >
            <FormLabel
              required={required}
              className={clsx(classes.label, { [classes.error]: error })}
            >
              {label}
            </FormLabel>
          </div>
        )}
        <TextareaAutosize
          ref={ref}
          className={clsx(classes.root, classesReddit.root, {
            [classes.hasLabel]: label,
            [classes.error]: error,
          })}
          maxRows={4}
          {...rest}
        />
        {helperText && (
          <FormHelperText error={error} sx={{ mt: 0.5 }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default VoTextArea;
