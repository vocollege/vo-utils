import { lighten, Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(5),
    },
    table: {
      // minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    actionColumn: {
      textAlign: "right",
      whiteSpace: "nowrap",
      width: 140,
    },
    actionButton: {
      marginRight: theme.spacing(2),
      padding: theme.spacing(0.5),
      "&:last-child": {
        marginRight: 0,
      },
    },
    cellContent: {
      display: "block",
      maxHeight: theme.spacing(7),
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.up("md")]: {
        maxHeight: theme.spacing(12),
      },
    },
    // @TODO Add animation to the row and extract it to a central style.
    // fakeRow: {
    //   display: "block",
    //   backgroundColor: "#eee",
    //   height: "20px",
    // },
  })
);

export const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "stretch",
      display: "flex",
      flexDirection: "column",
      // paddingLeft: theme.spacing(2),
      // paddingRight: theme.spacing(1),
      padding: theme.spacing(2),
      "&$noTitle": {
        minHeight: 0,
      },
    },
    highlight:
      theme.palette.mode === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
    noTitle: {},
    // addButton: {
    //   bottom: theme.spacing(2),
    //   position: "fixed",
    //   right: theme.spacing(2),
    //   zIndex: theme.zIndex.drawer + 1
    // }
  })
);
