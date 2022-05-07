import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(
  createStyles({
    root: {
      alignItems: "center",
      border: `1px dotted ${VoTheme.palette.grey[500]}`,
      borderRadius: VoTheme.shape.borderRadius,
      display: "flex",
      minHeight: VoTheme.spacing(13),
      padding: 10,
    },
    details: {
      flex: 1,
      paddingRight: VoTheme.spacing(1),
    },
    button: {},
    detailsNothingSelected: {
      color: VoTheme.palette.grey[500],
    },
    textRoot: {
      wordBreak: "break-all",
    },
  })
);
