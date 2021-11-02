import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: "inherit",
      minHeight: 100,
      padding: "10px 12px",
      width: "100%",
    },
  })
);
