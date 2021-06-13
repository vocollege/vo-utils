import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
      height: 30,
      width: 30,
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
        padding: theme.spacing(1.5),
        [theme.breakpoints.down("sm")]: {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        },
      },
    },
    accountDialog: {
      height: "90vh",
      maxWidth: theme.spacing(100),
      maxHeight: theme.spacing(100),
      width: "90%",
    },
    accountDialogForm: {},
    accountDialogToolbar: {
      backgroundColor: theme.palette.common.white,
      bottom: 0,
      // boxShadow: theme.shadows[10],
      left: 0,
      position: "absolute",
      right: 0,
      zIndex: 1,
    },
    accountDialogFormTabs: {
      marginTop: 0,
    },
    accountDialogPaper: {
      boxShadow: "none",
      marginBottom: theme.spacing(8),
      position: "relative",
      zIndex: 0,
    },
  })
);
