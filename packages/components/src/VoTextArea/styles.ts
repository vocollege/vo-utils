import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "inherit",
      minHeight: 100,
      padding: "10px 12px",
      width: "100%",
      "&$hasLabel": {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
      "&$error": {
        borderColor: theme.palette.error.main,
      },
    },
    labelWrapper: {
      border: `1px solid #ccc`,
      borderBottom: "none",
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      "&$error": {
        borderColor: theme.palette.error.main,
      },
    },
    label: {
      "&$error": {
        color: theme.palette.error.main,
      },
    },
    hasLabel: {},
    error: {},
  })
);
