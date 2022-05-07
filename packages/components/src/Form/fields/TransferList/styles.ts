import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    label: {
      display: "block",
    },
    lists: {
      display: "flex",
    },
    list: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      marginTop: VoTheme.spacing(2),
      "&:last-child": {
        marginLeft: VoTheme.spacing(2),
      },
    },
    listLabel: {
      display: "block",
      marginBottom: VoTheme.spacing(1),
    },
    listContent: {
      border: `1px dotted ${VoTheme.palette.grey[300]}`,
      borderRadius: VoTheme.shape.borderRadius,
      flex: 1,
      padding: VoTheme.spacing(2),
    },
    listContentDragging: {
      border: `1px dashed ${VoTheme.palette.primary.main}`,
    },
    item: {
      backgroundColor: VoTheme.palette.grey[100],
      border: `1px solid ${VoTheme.palette.grey[200]}`,
      borderRadius: VoTheme.shape.borderRadius,
      margin: `0 0 ${VoTheme.spacing(2)} 0`,
      minHeight: VoTheme.spacing(6.5),
      padding: VoTheme.spacing(1),
      userSelect: "none",
      "&:last-child": {
        marginBottom: 0,
      },
      "&$itemDragging, &$itemSelected": {
        backgroundColor: VoTheme.palette.primary.main,
        borderColor: VoTheme.palette.primary.main,
        color: VoTheme.palette.primary.contrastText,
      },
    },
    itemDragging: {
      boxShadow: VoTheme.shadows[20],
    },
    itemSelected: {},
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
