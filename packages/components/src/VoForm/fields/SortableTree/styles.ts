import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    resetButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      zIndex: 1,
    },
    treeWrapper: {
      height: 400,
      zIndex: 0,
      [theme.breakpoints.up("md")]: {
        height: 600,
      },
      [theme.breakpoints.up("lg")]: {
        height: `calc(100vh - ${theme.spacing(32)}px)`,
      },
    },
    treeNode: {
      borderRadius: theme.shape.borderRadiusField,
      border: `3px dotted transparent`,
    },
    treeNodeChanged: {
      borderColor: theme.palette.warning.main,
    },
  })
);
