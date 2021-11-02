import {
  createStyles,
  Theme,
  makeStyles,
  alpha,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    clearButton: {
      marginRight: theme.spacing(1),
    },
    fileDetailsWrapper: {
      alignItems: "center",
      display: "flex",
      marginTop: theme.spacing(2),
    },
    fileDetails: {
      flex: 1,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    fileThumbnail: {
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[9],
      display: "block",
      height: "auto",
      marginLeft: theme.spacing(2),
      maxWidth: theme.spacing(22),
    },
    simplified: {
      "& $fileDetailsWrapper": {
        marginTop: 0,
      },
    },
    loaderWrapper: {
      alignItems: "center",
      backgroundColor: alpha(theme.palette.common.white, 0.5),
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
  })
);
