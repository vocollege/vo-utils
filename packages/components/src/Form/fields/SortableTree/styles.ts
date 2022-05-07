import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(
  createStyles({
    root: {
      position: "relative",
    },
    resetButton: {
      position: "absolute",
      right: VoTheme.spacing(1),
      top: VoTheme.spacing(1),
      zIndex: 1,
    },
    treeWrapper: {
      height: 400,
      zIndex: 0,
      [VoTheme.breakpoints.up("md")]: {
        height: 600,
      },
      [VoTheme.breakpoints.up("lg")]: {
        height: `calc(100vh - ${VoTheme.spacing(32)})`,
      },
    },
    treeNode: {
      borderRadius: VoTheme.shape.borderRadius,
      border: `3px dotted transparent`,
    },
    treeNodeChanged: {
      borderColor: VoTheme.palette.warning.main,
    },
  })
);
