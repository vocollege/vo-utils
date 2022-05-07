import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      color: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      zIndex: theme.zIndex.tooltip + 2,
    },
    noOverlay: {
      alignItems: "center",
      color: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "fixed",
      right: theme.spacing(4),
      top: theme.spacing(17),
      zIndex: theme.zIndex.modal + 1,
    },
    title: {
      marginTop: theme.spacing(2),
    },
  })
);
