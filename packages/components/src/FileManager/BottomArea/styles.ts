import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

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
      marginTop: theme.spacing(1) / 2,
      maxHeight: theme.spacing(6),
      overflowY: "auto",
      paddingTop: theme.spacing(1) / 2,
    },
    selectedElementDetails: {
      flex: 1,
    },
    selectedElementDates: {
      alignItems: "flex-end",
      display: "flex",
      flex: `0 0 ${theme.spacing(28)}px`,
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
