import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(
  createStyles({
    root: {
      margin: "0 auto",
      paddingBottom: VoTheme.spacing(3),
    },
    toolbarButton: {
      flexShrink: 0,
      marginLeft: VoTheme.spacing(1),
    },
    formTabs: {
      borderBottom: `1px solid ${VoTheme.palette.divider}`,
      marginLeft: VoTheme.spacing(-4),
      marginRight: VoTheme.spacing(-4),
      marginTop: VoTheme.spacing(-4),
      paddingLeft: VoTheme.spacing(4),
      paddingRight: VoTheme.spacing(4),
    },
    grow: {
      flexGrow: 1,
    },
    fieldRoot: {
      border: `1px dotted ${VoTheme.palette.grey[300]}`,
      borderRadius: VoTheme.shape.borderRadius,
      padding: VoTheme.spacing(1),
      width: "100%",
    },
    fieldHead: {
      alignItems: "center",
      display: "flex",
      minHeight: VoTheme.spacing(5),
    },
    fieldHeadLabel: {
      display: "block",
      flex: 1,
      paddingLeft: VoTheme.spacing(1),
    },
    fieldHeadActions: {
      alignItems: "center",
      display: "flex",
      marginLeft: VoTheme.spacing(1),
    },
    fieldHeadButton: {
      marginLeft: VoTheme.spacing(1),
    },
    fieldAddButton: {
      marginLeft: -36,
    },
  })
);
