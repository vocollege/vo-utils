import { Theme, alpha } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
    },
    clearButton: {
      marginRight: VoTheme.spacing(1),
    },
    fileDetailsWrapper: {
      alignItems: "center",
      display: "flex",
      marginTop: VoTheme.spacing(2),
    },
    fileDetails: {
      flex: 1,
      paddingLeft: VoTheme.spacing(1),
      paddingRight: VoTheme.spacing(1),
    },
    fileThumbnail: {
      borderRadius: VoTheme.shape.borderRadius,
      boxShadow: VoTheme.shadows[9],
      display: "block",
      height: "auto",
      marginLeft: VoTheme.spacing(2),
      maxWidth: VoTheme.spacing(22),
    },
    simplified: {
      "& $fileDetailsWrapper": {
        marginTop: 0,
      },
    },
    loaderWrapper: {
      alignItems: "center",
      backgroundColor: alpha(VoTheme.palette.common.white, 0.5),
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 1,
    },
    loader: {
      zIndex: 2,
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      padding: `0 ${VoTheme.spacing(1)}`,
    },
  })
);
