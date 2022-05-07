import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      // border: `1px solid red`,
      display: "flex",
      padding: theme.spacing(1),
    },
    grow: {
      flex: 1,
    },
    sortWrapper: {
      display: "flex",
      marginLeft: theme.spacing(2),
    },
    sortButton: {
      textTransform: "capitalize",
    },
    searchFieldWrapper: {
      alignItems: "center",
      display: "flex",
    },
    searchField: {
      paddingRight: theme.spacing(5),
    },
    clearSearchButton: {
      marginLeft: -36,
    },
    searchLoader: {
      marginLeft: theme.spacing(2),
    },
  })
);
