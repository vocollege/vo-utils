import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
  })
);
