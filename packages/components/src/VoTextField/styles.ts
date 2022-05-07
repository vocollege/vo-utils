import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputLabelRoot: {
      lineHeight: 1.2,
      marginTop: 2,
      maxWidth: `calc(100% - ${theme.spacing(3)})`,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  })
);
