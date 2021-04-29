import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // border: "1px solid red",
      // height: `calc(100% - ${theme.spacing(8)}px)`
      // marginTop: theme.spacing(17),
      display: "flex",
      flex: 1,
      flexDirection: "column",
      // padding: `0 0 ${theme.spacing(4)}px`,
    },
    loaderWrapper: {
      alignItems: "center",
      display: "flex",
      height: "30vh",
      justifyContent: "center",
      padding: theme.spacing(1),
    },
    contentWrapper: {
      alignItems: "stretch",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      marginTop: theme.spacing(1),
    },
    toolbar: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[10],
      margin: `0 -${theme.spacing(3)}px`,
      position: "sticky",
      top: theme.spacing(8),
      zIndex: theme.zIndex.appBar,
    },
    bottomArea: {
      alignItems: "center",
      backgroundColor: theme.palette.background.paper,
      bottom: 0,
      boxShadow: theme.shadows[10],
      display: "flex",
      margin: `0 -${theme.spacing(3)}px -${theme.spacing(7)}px`,
      maxHeight: theme.spacing(15),
      padding: theme.spacing(3),
      position: "sticky",
      zIndex: theme.zIndex.appBar,
    },
    actions: {
      alignSelf: "flex-end",
    },
    actionsWithBottomArea: {
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(17),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(17),
      },
    },
    header: {
      marginBottom: theme.spacing(3),
    },
  })
);
