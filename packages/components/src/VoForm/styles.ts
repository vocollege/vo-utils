import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(3),
    },
    toolbarButton: {
      flexShrink: 0,
      marginLeft: theme.spacing(1),
    },
    formTabs: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginLeft: theme.spacing(-4),
      marginRight: theme.spacing(-4),
      marginTop: theme.spacing(-4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    grow: {
      flexGrow: 1,
    },
    fieldRoot: {
      border: `1px dotted ${theme.palette.grey[300]}`,
      borderRadius: theme.shape.borderRadiusField,
      padding: theme.spacing(1),
      width: "100%",
    },
    fieldHead: {
      alignItems: "center",
      display: "flex",
      minHeight: theme.spacing(5),
    },
    fieldHeadLabel: {
      display: "block",
      flex: 1,
      paddingLeft: theme.spacing(1),
    },
    fieldHeadActions: {
      alignItems: "center",
      display: "flex",
      marginLeft: theme.spacing(1),
    },
    fieldHeadButton: {
      marginLeft: theme.spacing(1),
    },
    fieldAddButton: {
      marginLeft: -36,
    },
  })
);
