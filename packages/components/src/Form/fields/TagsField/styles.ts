import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    items: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(2),
    },
    item: {
      margin: theme.spacing(1 / 2),
    },
    chipOutlinedSecondary: {
      color: theme.palette.secondary.dark,
    },
  })
);
