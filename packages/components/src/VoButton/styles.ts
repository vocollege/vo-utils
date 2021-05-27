import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.spacing(5),
    },
    containedSecondary: {
      background: `linear-gradient(0deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
      "&:hover": {
        background: `linear-gradient(0deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 80%)`,
      },
    },
    outlinedSecondary: {
      borderColor: theme.palette.secondary.darker,
      color: theme.palette.secondary.darker,
    },
  })
);
