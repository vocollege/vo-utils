import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      paddingTop: theme.spacing(3),
    },
    alert: {
      alignSelf: "stretch",
    },
    grow: {
      alignItems: "center",
      display: "flex",
      flex: 1,
      paddingTop: theme.spacing(2),
    },
    message: {
      wordBreak: "break-all",
    },
  })
);
