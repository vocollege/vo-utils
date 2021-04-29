import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    fieldInput: {
      paddingRight: theme.spacing(7),
    },
    editButton: {
      position: "absolute",
      right: 2,
      top: 5,
    },
  })
);
