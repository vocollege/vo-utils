import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fields: {
      marginTop: theme.spacing(-1 / 2),
    },
  })
);
