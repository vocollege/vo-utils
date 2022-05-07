import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },

    error: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
    },

    warning: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },

    info: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.info.dark,
      },
    },

    success: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.success.dark,
      },
    },

    margin: {
      margin: theme.spacing(2),
    },

    pullLeft: {
      float: "left",
    },

    pullRight: {
      float: "right",
    },
  })
);
