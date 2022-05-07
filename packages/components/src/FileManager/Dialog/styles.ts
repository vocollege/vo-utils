import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      maxWidth: theme.spacing(150),
      minHeight: "90vh",
      width: "90%",
    },
    toolbar: {
      boxShadow: theme.shadows[9],
      // border: "1px solid red",
      margin: `0 -${theme.spacing(3)}`,
      top: 0,
    },
    contentRoot: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: 0,
      paddingTop: 0,
    },
    actions: {
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        right: theme.spacing(3),
      },
    },

    // root: {

    // },
    // titleRoot: {
    //   alignItems: "center",
    //   display: "flex",
    //   paddingRight: theme.spacing(2)
    // },
    // titleWrapper: {
    //   display: "flex",
    //   flex: 1,
    //   flexDirection: "column"
    // },
    // title: {
    // },
    // subtitle: {

    // },
    // paper: {
    //   width: theme.spacing(60)
    // },
    // contentRoot: {
    // },
    // actionsRoot: {
    //   padding: `${theme.spacing(2)} ${theme.spacing(3)}`
    // },
    // // buttonConfirm: {
    // //   position: "relative",
    // // },
    // // buttonConfirmLabel: {},
    // // loading: {
    // //   "& $buttonConfirmLabel": {
    // //     opacity: 0
    // //   }
    // // },
    // // buttonCreateLoading: {
    // //   position: "absolute"
    // // }
  })
);
