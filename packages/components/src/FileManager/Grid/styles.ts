import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      padding: `0 ${theme.spacing(3)}px ${theme.spacing(7)}px`,
    },
    elementWrapper: {
      display: "inline-block",
      maxWidth: "50%",
      minWidth: "50%",
      position: "relative",
      verticalAlign: "top",
      [theme.breakpoints.up("sm")]: {
        maxWidth: "33%",
        minWidth: "33%",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "100%",
        minWidth: 0,
        width: theme.spacing(20),
      },
    },
  })
);
