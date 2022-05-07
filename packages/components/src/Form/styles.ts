import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      paddingBottom: VoTheme.spacing(3),
    },
    toolbarButton: {
      flexShrink: 0,
      marginLeft: VoTheme.spacing(1),
      // "&$noLabel": {
      //   minWidth: 0,
      //   "& .MuiButton-startIcon": {
      //     marginRight: theme.spacing(-0.5),
      //   },
      // },
    },
    toolbarButtonNoLabel: {
      flexShrink: 0,
      marginLeft: VoTheme.spacing(1),
    },
    formTabs: {
      borderBottom: `1px solid ${VoTheme.palette.divider}`,
      marginLeft: VoTheme.spacing(-3),
      marginRight: VoTheme.spacing(-3),
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
      padding: `6px ${VoTheme.spacing(1)}`,
      width: "100%",
    },
    fieldHead: {
      alignItems: "center",
      display: "flex",
      flexFlow: "wrap",
      justifyContent: "flex-end",
      minHeight: VoTheme.spacing(5),
      "& > button:first-of-type:not(:first-child)": {
        marginLeft: VoTheme.spacing(1),
      },
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
    gridContainer: {
      "& $gridItem": {
        "&$gridItemHidden": {
          padding: 0,
        },
      },
    },
    gridItem: {},
    gridItemHidden: {},
    noLabel: {},
  })
);
