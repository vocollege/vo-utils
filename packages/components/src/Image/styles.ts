import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "auto",
      maxWidth: "100%",
      objectFit: "cover",
    },
  })
);
