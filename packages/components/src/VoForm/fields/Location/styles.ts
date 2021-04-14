import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fields: {
      marginTop: theme.spacing(-1 / 2),
    },
  })
);
