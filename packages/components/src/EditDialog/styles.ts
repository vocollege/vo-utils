import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&$noBackdrop": {
        // bottom: "auto",
        // left: "auto",
        // right: "auto",
        // top: "auto",
      },
    },
    titleRoot: {
      alignItems: "center",
      display: "flex",
      paddingRight: theme.spacing(2),
      "&$draggable": {
        cursor: "move",
      },
    },
    titleWrapper: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    title: {},
    subtitle: {},
    paper: {
      width: theme.spacing(60),
      "&$loading": {
        background: "none",
        boxShadow: "none",
      },
    },
    contentRoot: {
      "&$loading": {
        opacity: 0,
      },
    },
    actionsRoot: {
      padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    },
    loading: {},
    // buttonConfirm: {
    //   position: "relative",
    // },
    // buttonConfirmLabel: {},
    // loading: {
    //   "& $buttonConfirmLabel": {
    //     opacity: 0
    //   }
    // },
    // buttonCreateLoading: {
    //   position: "absolute"
    // }
    draggable: {},
    noBackdrop: {},
    extraActions: {
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      "&:not(:last-child)": {
        marginRight: theme.spacing(1),
      },
    },
  })
);
