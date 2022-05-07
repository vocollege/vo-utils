import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    items: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: VoTheme.spacing(2),
    },
    item: {
      margin: VoTheme.spacing(1 / 2),
    },
    chipOutlinedSecondary: {
      color: VoTheme.palette.secondary.dark,
    },
  })
);
