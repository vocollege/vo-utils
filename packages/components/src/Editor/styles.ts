import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    labelWrapper: {
      border: `1px solid #ccc`,
      borderBottom: "none",
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    },
    label: {},
  })
);
