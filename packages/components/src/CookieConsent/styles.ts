import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      bottom: theme.spacing(4),
      left: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      maxWidth: theme.spacing(60),
      padding: theme.spacing(2),
      position: "fixed",

      zIndex: theme.zIndex.modal,
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
        right: theme.spacing(4),
      },
    },
    title: {},
    message: {
      margin: `${theme.spacing(2)}px 0`,
    },
    actions: {
      alignItems: "flex-end",
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(1),
    },
  })
);
