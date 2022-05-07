import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
    },
    fieldInput: {
      paddingRight: VoTheme.spacing(7),
    },
    editButton: {
      position: "absolute",
      right: 2,
      top: 5,
    },
  })
);
