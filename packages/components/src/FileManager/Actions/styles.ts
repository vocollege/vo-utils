import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    exampleWrapper: {
      position: "relative",
      marginTop: theme.spacing(3),
      height: 380,
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    actions: {
      bottom: theme.spacing(6),
      position: "absolute",
      right: 0,
    },
    speedDial: {
      position: "sticky",
      transition: `all ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`,
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(4),
        right: theme.spacing(4),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(4),
        left: theme.spacing(4),
      },
    },
  })
);
