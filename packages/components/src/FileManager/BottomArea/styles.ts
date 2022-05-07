import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
    selectedElement: {
      alignItems: "center",
      color: theme.palette.secondary.dark,
      display: "flex",
    },
    selectedElementIcon: {
      marginRight: theme.spacing(2),
    },
    selectedElementTitle: {
      fontWeight: "bold",
    },
    selectedElementId: {},
    selectedElementSize: {},
    selectedElementDescription: {
      borderTop: `1px solid ${theme.palette.divider}`,
      lineHeight: theme.typography.body2.lineHeight,
      marginTop: parseInt(`${theme.spacing(1)}`) / 2,
      maxHeight: theme.spacing(6),
      overflowY: "auto",
      paddingTop: parseInt(`${theme.spacing(1)}`) / 2,
    },
    selectedElementDetails: {
      flex: 1,
    },
    selectedElementDates: {
      alignItems: "flex-end",
      display: "flex",
      flex: `0 0 ${theme.spacing(28)}`,
      flexDirection: "column",
    },
    icon: {
      fontSize: theme.typography.h5.fontSize,
      marginRight: theme.spacing(1),
    },
    date: {
      alignItems: "center",
      cursor: "default",
      display: "flex",
      marginBottom: theme.spacing(1),
      "&:last-child": {
        marginBottom: 0,
      },
    },
  })
);
