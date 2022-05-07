import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: VoTheme.spacing(5),
    },
    containedSecondary: {
      background: `linear-gradient(0deg, ${VoTheme.palette.secondary.dark} 0%, ${VoTheme.palette.secondary.main} 100%)`,
      "&:hover": {
        background: `linear-gradient(0deg, ${VoTheme.palette.secondary.dark} 0%, ${VoTheme.palette.secondary.main} 80%)`,
      },
    },
    outlinedSecondary: {
      borderColor: VoTheme.palette.secondary.darker,
      color: VoTheme.palette.secondary.darker,
    },
  })
);
