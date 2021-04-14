import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    fieldWrapper: {
      position: "relative",
    },
    dialogPaper: {
      width: theme.spacing(60),
    },
    dialogTitleRoot: {
      alignItems: "center",
      display: "flex",
      paddingRight: theme.spacing(2),
    },
    dialogTitle: {
      flex: 1,
    },
    dialogContentRoot: {
      paddingBottom: theme.spacing(2),
      paddingTop: 3,
      position: "relative",
    },
    searchResultWrapper: {
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: theme.shape.borderRadiusField,
      // marginTop: -2,
      marginTop: theme.spacing(1),
      maxHeight: 180,
      overflowY: "auto",
      position: "relative",
    },
    searchResult: {
      // margin: `0 -${theme.spacing(3)}px`,
      overflow: "hidden",
      padding: 0,
      position: "relative",
      // width: `calc(100% - ${theme.spacing(2)}px)`,
      zIndex: 0,
    },

    searchResultItem: {
      // borderRadius: theme.shape.borderRadiusField,
      padding: `0 ${theme.spacing(2)}px`,
    },
    searchResultLoader: {
      bottom: theme.spacing(1) / 2,
      left: theme.spacing(1),
      position: "absolute",
      right: theme.spacing(1),
      zIndex: 3,
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
      paddingRight: theme.spacing(7),
    },
    nothingFound: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
      textAlign: "center",
    },
  })
);
