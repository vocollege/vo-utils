import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    // dialogTitleRoot: {
    //   alignItems: "center",
    //   display: "flex",
    //   paddingRight: theme.spacing(2)
    // },
    // dialogTitle: {
    //   flex: 1,
    // },
    // dialogPaper: {
    //   width: theme.spacing(60)
    // },
    // dialogContentRoot: {
    // },
    // dialogActionsRoot: {
    //   padding: `${theme.spacing(2)} ${theme.spacing(3)}`
    // },

    // buttonCreate: {
    //   position: "relative",
    //   loading: {
    //     "& $buttonSave": {
    //       opacity: 0
    //     }
    //   }
    // },
    // buttonCreateLabel: {}
  })
);
