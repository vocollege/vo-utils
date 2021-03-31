import {
  createStyles,
  Theme,
  makeStyles,
  fade,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      "& .MuiFilledInput-root": {
        backgroundColor: "transparent",
      },
      "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": {
        display: "none",
      },
    },
    fullWidth: {
      width: "100%",
    },
    error: {
      "& $root": {
        borderColor: theme.palette.error.dark,
      },
      "& $select:focus": {
        boxShadow: `${fade(theme.palette.error.dark, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.error.dark,
      },
    },
    root: {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: theme.spacing(1),
      backgroundColor: "#fcfcfb",
      outline: "none",
      transition: theme.transitions.create(["border-color", "box-shadow"]),

      "&:hover": {
        backgroundColor: "#ffffff",
      },
    },
    select: {
      "&:focus": {
        backgroundColor: "#fff",
        borderRadius: theme.spacing(1),
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
);
