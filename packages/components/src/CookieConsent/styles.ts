import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

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
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        right: theme.spacing(4),
      },
    },
    title: {},
    message: {
      margin: `${theme.spacing(2)} 0`,
    },
    // actions: {
    //   alignItems: "center",
    //   display: "flex",
    //   flexDirection: "row",
    //   justifyContent: "flex-start",
    //   marginTop: theme.spacing(1),
    // },
  })
);
