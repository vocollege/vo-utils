import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // border: "1px solid red",
      display: "flex",
      position: "relative",
      "&$loading": {
        "& $buttonText, & .MuiButton-startIcon": {
          opacity: 0,
        },
      },
    },
    loading: {},
    paper: {
      borderRadius: theme.shape.borderRadiusField,
    },
    loader: {
      left: "50%",
      marginLeft: -10,
      marginTop: -10,
      position: "absolute",
      top: "50%",
    },
    buttonText: {},
  })
);
