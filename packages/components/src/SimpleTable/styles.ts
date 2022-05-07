import { Theme, alpha } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperRoot: {
      marginBottom: theme.spacing(2),
      padding: 0,
      width: "100%",
    },
    table: {
      minWidth: 750,
    },
    tableContainer: {
      overflow: "visible",
    },
    tableHead: {
      backgroundColor: alpha(theme.palette.common.white, 0.93),
      "&$sticky": {
        position: "sticky",
        top: 0,
      },
    },
    tableRow: {
      "&:hover": {
        backgroundColor: theme.palette.grey[50],
      },
    },
    sticky: {},
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    // nothingFound: {
    //   alignItems: "center",
    //   display: "flex",
    //   height: "20vh",
    //   justifyContent: "center",
    //   padding: theme.spacing(1)
    // },

    // @TODO Add animation to the row and extract it to a central style.
    fakeRow: {
      display: "block",
      backgroundColor: "#eee",
      height: "20px",
    },
  })
);
