import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
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
      marginTop: theme.spacing(2),
      "&:last-child": {
        marginLeft: theme.spacing(2),
      },
    },
    listLabel: {
      display: "block",
      marginBottom: theme.spacing(1),
    },
    listContent: {
      border: `1px dotted ${theme.palette.grey[300]}`,
      borderRadius: theme.shape.borderRadius,
      flex: 1,
      padding: theme.spacing(2),
    },
    listContentDragging: {
      border: `1px dashed ${theme.palette.primary.main}`,
    },
    item: {
      backgroundColor: theme.palette.grey[100],
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadius,
      margin: `0 0 ${theme.spacing(2)}px 0`,
      minHeight: theme.spacing(6.5),
      padding: theme.spacing(1),
      userSelect: "none",
      "&:last-child": {
        marginBottom: 0,
      },
      "&$itemDragging, &$itemSelected": {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
    itemDragging: {
      boxShadow: theme.shadows[20],
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
      marginRight: theme.spacing(1),
    },
    rowTitle: {
      flex: 1,
      minWidth: 0,
    },
    rowActions: {
      marginLeft: theme.spacing(1),
    },
    rowItemTitle: {},
    rowItemDetails: {},
    rowItemDetailsLabel: {
      fontWeight: theme.typography.fontWeightBold,
      marginRight: theme.spacing(1),
    },
    rowItemDetailsValue: {
      marginRight: theme.spacing(2),
    },
    textNoWrap: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  })
);
