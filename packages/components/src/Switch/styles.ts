import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(
  createStyles({
    root: {
      alignItems: "center",
      display: "flex",
      border: `1px dotted ${VoTheme.palette.grey[500]}`,
      borderRadius: VoTheme.shape.borderRadius,
      padding: "10px 12px",
    },
    label: {
      marginRight: 0,
    },
    small: {
      padding: "7px 12px",
    },
    medium: {
      padding: "10px 12px",
    },
  })
);
