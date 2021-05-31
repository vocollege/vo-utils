import { createStyles, makeStyles } from "@material-ui/core/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      border: `1px dotted ${VoTheme.palette.grey[500]}`,
      borderRadius: VoTheme.shape.borderRadius,
      padding: "10px 12px",
    },
    label: {
      flexBasis: "100%",
    },
  })
);
