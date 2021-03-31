import {
  fade,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

export const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: theme.spacing(1),
      backgroundColor: "#fcfcfb",
      outline: "none",
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
