import { alpha, Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: "50vw",
      // minWidth: theme.spacing(20),
      // position: "relative",

      [theme.breakpoints.up("lg")]: {
        borderLeft: "none",
        boxShadow: theme.shadows[11],
      },
    },
    drawer: {
      [theme.breakpoints.down("lg")]: {
        boxShadow: "none",
        zIndex: theme.zIndex.drawer + 2,
      },
    },
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      position: "relative",
    },
    content: {
      // marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
    contentTitle: {
      // marginBottom: theme.spacing(3),
    },
    contentBody: {
      marginTop: theme.spacing(3),
    },
    contentTags: {
      marginTop: theme.spacing(2),
    },
    tag: {
      margin: theme.spacing(0.5),
    },
    relatedTitle: {
      borderTop: `1px solid ${theme.palette.grey[200]}`,
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    loader: {
      position: "absolute",
    },
    actions: {
      backgroundColor: alpha(theme.palette.common.white, 0.95),
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      display: "flex",
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      position: "sticky",
      top: 0,
      // zIndex: 1,
      [theme.breakpoints.up("lg")]: {
        top: theme.spacing(8),
      },
    },
    actionsTitle: {
      alignSelf: "center",
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    nothingFound: {
      alignItems: "center",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      padding: theme.spacing(2),
      textAlign: "center",
    },
    grow: {
      flex: 1,
    },
    closeButton: {
      justifySelf: "flex-end",
    },
    listIcon: {
      color: theme.palette.success.main,
      minWidth: theme.spacing(5),
    },
    listPrimaryText: {
      color: theme.palette.success.main,
    },
  })
);
