import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: "80vh",
      minHeight: "auto",
      maxWidth: "60vw",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        maxHeight: 700,
        maxWidth: "96vw",
      },
      [theme.breakpoints.up("md")]: {
        maxHeight: 700,
        maxWidth: 700,
      },
    },
    formRoot: {},
    tabsWrapper: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    panelWrapper: {
      marginTop: theme.spacing(3),
    },
  })
);
