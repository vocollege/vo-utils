import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(
  createStyles({
    root: {},
    fieldWrapper: {
      position: "relative",
    },
    dialogPaper: {
      width: VoTheme.spacing(60),
    },
    dialogTitleRoot: {
      alignItems: "center",
      display: "flex",
      paddingRight: VoTheme.spacing(2),
    },
    dialogTitle: {
      flex: 1,
    },
    dialogContentRoot: {
      paddingBottom: VoTheme.spacing(2),
      paddingTop: 3,
      position: "relative",
    },
    searchResultWrapper: {
      border: `1px solid ${VoTheme.palette.grey[200]}`,
      borderRadius: VoTheme.shape.borderRadius,
      marginTop: VoTheme.spacing(1),
      maxHeight: 180,
      overflowY: "auto",
      position: "relative",
    },
    searchResult: {
      overflow: "hidden",
      padding: 0,
      position: "relative",
      zIndex: 0,
    },

    searchResultItem: {
      padding: `0 ${VoTheme.spacing(2)}`,
    },
    // Double selectors to ensure that the style is applied, since
    // .MuiLinearProgress is created after this on site using this
    // library and Material UI Progress at the same time.
    searchResultLoaderRoot: {
      "&$searchResultLoader": {
        bottom: parseInt(`${VoTheme.spacing(1)}`) / 2,
        left: VoTheme.spacing(1),
        position: "absolute",
        right: VoTheme.spacing(1),
        zIndex: 3,
      },
    },
    searchResultLoader: {},
    rowItemTitle: {},
    rowItemDetails: {},
    rowItemDetailsLabel: {
      fontWeight: VoTheme.typography.fontWeightBold,
      marginRight: VoTheme.spacing(1),
    },
    rowItemDetailsValue: {
      marginRight: VoTheme.spacing(2),
    },
    textNoWrap: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    addButton: {
      position: "absolute",
      right: 50,
      top: 5,
    },
    clearButton: {
      position: "absolute",
      right: 2,
      top: 5,
    },
    closeButton: {},
    fieldInput: {
      paddingRight: VoTheme.spacing(7),
    },
    nothingFound: {
      marginBottom: VoTheme.spacing(1),
      marginTop: VoTheme.spacing(2),
      textAlign: "center",
    },
  })
);
