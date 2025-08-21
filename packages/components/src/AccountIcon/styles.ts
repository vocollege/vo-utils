import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-flex",
      position: "relative",
      "&$loading": {
        "& $buttonText, & .MuiButton-startIcon": {
          opacity: 0,
        },
      },
    },
    loading: {},
    firstLoading: {
      // margin: theme.spacing(1.5),
    },
    paper: {
      borderRadius: theme.shape.borderRadius,
    },
    loader: {
      left: "50%",
      marginLeft: -10,
      marginTop: -10,
      position: "absolute",
      top: "50%",
    },
    userImage: {
      borderRadius: "100%",
      display: "inline-block",
      height: 28,
      width: 28,
    },
    button: {},
    buttonText: {},
    iframe: {
      display: "none",
      height: 0,
      tabindex: -1,
      width: 0,
    },
    onlyImage: {
      "& $buttonText": {
        display: "none",
      },
      "& .MuiButton-startIcon": {
        marginLeft: 1,
        marginRight: 1,
      },
      "& $button": {
        borderRadius: "100%",
        minWidth: 0,
        padding: 5,
        // padding: theme.spacing(1),
        // [theme.breakpoints.down("md")]: {
        //   paddingLeft: theme.spacing(1),
        //   paddingRight: theme.spacing(1),
        // },
      },
    },
    accountDialog: {
      // height: "90vh",
      // maxWidth: theme.spacing(100),
      // maxHeight: theme.spacing(100),
      // width: "90%",

      maxHeight: "80vh",
      minHeight: "auto",
      maxWidth: "60vw",
      [theme.breakpoints.down("sm")]: {
        maxHeight: 700,
        maxWidth: "96vw",
      },
      [theme.breakpoints.up("md")]: {
        maxHeight: 700,
        maxWidth: 700,
      },

      "&.MuiPaper-root": {
        width: "100%",
      },

      "& .vo-global__content-with-toolbar": {
        boxShadow: "none",
        padding: 0,
      },
      "& .vo-global__content-toolbar": {
        padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 2,
      },
    },
    accountDialogForm: {},
    accountDialogToolbar: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[10],
      marginBottom: theme.spacing(2),
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    accountDialogFormTabs: {
      marginTop: 0,
    },
    personIcon: {},
    personIconBig: {},
  })
);
