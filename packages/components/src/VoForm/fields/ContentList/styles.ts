import {
    createStyles,
    Theme,
    makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: `1px dotted ${theme.palette.grey[500]}`,
      borderRadius: theme.shape.borderRadiusField,
      padding: theme.spacing(2),
      width: "100%"
    },
    head: {
      alignItems: "center",
      display: "flex",
      // marginBottom: theme.spacing(2),
      minHeight: theme.spacing(5)
    },
    headLabel: {
      display: "block",
      flex: 1,
    },
    headActions: {
      display: "flex",
      marginLeft: theme.spacing(1)
    },
    headButton: {
      marginLeft: theme.spacing(1)
    },
    nothingAdded: {
      margin: `${theme.spacing(2)}px 0 0`
    },
    search: {
    },
    searchField: {
      position: "relative",
      zIndex: 1
    },
    searchFieldWithResult: {
      boxShadow: theme.shadows[9]
    },
    searchResultWrapper: {
      marginTop: -2,
      position: "relative",
    },
    searchResult: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
      margin: "0 auto",
      position: "relative",
      width: `calc(100% - ${theme.spacing(2)}px)`,
      zIndex: 0
    },
    searchResultItem: {
      // padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
      padding: theme.spacing(1)
    },
    searchResultLoader: {
      left: theme.spacing(1),
      position: "absolute",
      right: theme.spacing(1),
      top: `-${theme.spacing(1)}px`,
      zIndex: 3
    },
    list: {
      border: "2px dashed transparent",
      borderRadius: theme.shape.borderRadiusField,
      margin: `0 -${theme.spacing(1)+2}px -${theme.spacing(1)}px`,
      padding: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
    },
    listDragging: {
      borderColor: theme.palette.primary.main
    },
    item: {
      backgroundColor: theme.palette.grey[100],
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadiusField,
      margin: `0 0 ${theme.spacing(2)}px 0`,
      padding: theme.spacing(1),
      userSelect: "none",
    },
    itemDragging: {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      boxShadow: theme.shadows[20],      
      color: theme.palette.primary.contrastText
    },
    row: {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap"
    },
    rowDragArea: {
      alignItems: "center",
      display: "flex",
      marginRight: theme.spacing(1)
    },
    rowTitle: {
      flex: 1,
      minWidth: 0
    },
    rowActions: {
      marginLeft: theme.spacing(1)
    },
    rowItemTitle: {
    },
    rowItemDetails: {

    },
    rowItemDetailsLabel: {
      fontWeight: theme.typography.fontWeightBold,
      marginRight: theme.spacing(1)
    },
    rowItemDetailsValue: {
      marginRight: theme.spacing(2)
    },
    textNoWrap: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  })
);
