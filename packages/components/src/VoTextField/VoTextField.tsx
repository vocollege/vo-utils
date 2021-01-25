import React from "react";
import {
  fade,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
// import Button from "@material-ui/core/Button";

// @TODO
// Use vocollege2 theme here...

const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: theme.spacing(1),
      backgroundColor: "#fcfcfb",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&$focused": {
        backgroundColor: "#fff",
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
        "&$error": {
          boxShadow: `${fade(theme.palette.error.dark, 0.25)} 0 0 0 2px`,
          borderColor: theme.palette.error.dark,
        },
      },
      "&$error": {
        borderColor: theme.palette.error.dark,
      },
    },
    focused: {},
    error: {},
  })
);

const VoTextField = (props: TextFieldProps) => {
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

// const VoTextField = () => {
//   // return <div>VoTextField TEST</div>;
//   return <Button>Test 2</Button>;
// };

export default VoTextField;
