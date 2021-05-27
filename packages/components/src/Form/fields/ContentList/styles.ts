import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(
  createStyles({
    root: {
      border: `1px dotted ${VoTheme.palette.grey[500]}`,
      borderRadius: VoTheme.shape.borderRadius,
      padding: VoTheme.spacing(2),
      width: "100%",
    },
    head: {
      alignItems: "center",
      display: "flex",
      // marginBottom: VoTheme.spacing(2),
      minHeight: VoTheme.spacing(5),
    },
    headLabel: {
      display: "block",
      flex: 1,
    },
    headActions: {
      display: "flex",
      marginLeft: VoTheme.spacing(1),
    },
    headButton: {
      marginLeft: VoTheme.spacing(1),
    },
    nothingAdded: {
      margin: `${VoTheme.spacing(2)}px 0 0`,
    },
    search: {},
    searchField: {
      position: "relative",
      zIndex: 1,
    },
    searchFieldWithResult: {
      boxShadow: VoTheme.shadows[9],
    },
    searchResultWrapper: {
      marginTop: -2,
      position: "relative",
    },
    searchResult: {
      border: `1px solid ${VoTheme.palette.grey[200]}`,
      borderRadius: `0 0 ${VoTheme.spacing(1)}px ${VoTheme.spacing(1)}px`,
      margin: "0 auto",
      position: "relative",
      width: `calc(100% - ${VoTheme.spacing(2)}px)`,
      zIndex: 0,
    },
    searchResultItem: {
      // padding: `${VoTheme.spacing(1)}px ${VoTheme.spacing(2)}px`
      padding: VoTheme.spacing(1),
    },
    searchResultLoader: {
      left: VoTheme.spacing(1),
      position: "absolute",
      right: VoTheme.spacing(1),
      top: `-${VoTheme.spacing(1)}px`,
      zIndex: 3,
    },
    list: {
      border: "2px dashed transparent",
      borderRadius: VoTheme.shape.borderRadius,
      margin: `0 -${VoTheme.spacing(1) + 2}px -${VoTheme.spacing(1)}px`,
      padding: `${VoTheme.spacing(2)}px ${VoTheme.spacing(1)}px 0`,
    },
    listDragging: {
      borderColor: VoTheme.palette.primary.main,
    },
    item: {
      backgroundColor: VoTheme.palette.grey[100],
      border: `1px solid ${VoTheme.palette.grey[200]}`,
      borderRadius: VoTheme.shape.borderRadius,
      margin: `0 0 ${VoTheme.spacing(2)}px 0`,
      padding: VoTheme.spacing(1),
      userSelect: "none",
    },
    itemDragging: {
      backgroundColor: VoTheme.palette.primary.main,
      borderColor: VoTheme.palette.primary.main,
      boxShadow: VoTheme.shadows[20],
      color: VoTheme.palette.primary.contrastText,
    },
    row: {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
    },
    rowDragArea: {
      alignItems: "center",
      display: "flex",
      marginRight: VoTheme.spacing(1),
    },
    rowTitle: {
      flex: 1,
      minWidth: 0,
    },
    rowActions: {
      marginLeft: VoTheme.spacing(1),
    },
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
  })
);
