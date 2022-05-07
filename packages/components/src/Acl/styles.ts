import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 900,
    },
    permissionGroupLabel: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
    permissionHead: {
      top: `${theme.spacing(17)} !important`,
    },
  })
);
