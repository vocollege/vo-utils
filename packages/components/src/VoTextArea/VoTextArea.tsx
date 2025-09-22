import React from "react";
import Typography from "@mui/material/Typography";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

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
      <>
        {label && (
          <div
            className={clsx(classes.labelWrapper, { [classes.error]: error })}
          >
            <Typography
              variant="subtitle1"
              component="label"
              className={clsx(classes.label, { [classes.error]: error })}
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
      </>
    );
  }
);

export default VoTextArea;
