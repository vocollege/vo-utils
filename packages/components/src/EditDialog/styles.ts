import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    titleRoot: {
      alignItems: "center",
      display: "flex",
      paddingRight: theme.spacing(2),
    },
    titleWrapper: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
    },
    title: {},
    subtitle: {},
    paper: {
      width: theme.spacing(60),
      "&$loading": {
        background: "none",
        boxShadow: "none",
      },
    },
    contentRoot: {},
    actionsRoot: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
    loading: {},
    // buttonConfirm: {
    //   position: "relative",
    // },
    // buttonConfirmLabel: {},
    // loading: {
    //   "& $buttonConfirmLabel": {
    //     opacity: 0
    //   }
    // },
    // buttonCreateLoading: {
    //   position: "absolute"
    // }
  })
);
