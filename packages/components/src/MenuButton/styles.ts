import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(7),
      padding: theme.spacing(1.5),
      position: "relative",
      width: theme.spacing(7),
      [theme.breakpoints.up("lg")]: {
        height: theme.spacing(8),
        width: theme.spacing(8),
      },
    },
    opened: {
      "& $bar1, & $bar3": {
        backgroundColor: theme.palette.primary.contrastText,
        right: 12,
        top: 30,
        width: theme.spacing(5),
      },
      "& $bar1": {
        transform: "rotate(45deg)",
      },
      "& $bar2": {
        opacity: 0,
      },
      "& $bar3": {
        transform: "rotate(-45deg)",
      },
    },
    bar: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "30%",
      display: "block",
      height: 4,
      position: "absolute",
      right: theme.spacing(1.5),
      transition: theme.transitions.create("all", {
        duration: theme.transitions.duration.shorter,
      }),
    },
    bar1: {
      top: 17,
      width: theme.spacing(3.5),
      [theme.breakpoints.up("lg")]: {
        top: 18,
        width: theme.spacing(4),
      },
    },
    bar2: {
      top: 26,
      width: theme.spacing(3),
      [theme.breakpoints.up("lg")]: {
        top: 30,
        width: theme.spacing(3.5),
      },
    },
    bar3: {
      top: 36,
      width: theme.spacing(4),
      [theme.breakpoints.up("lg")]: {
        top: 43,
        width: theme.spacing(5),
      },
    },
  })
);
