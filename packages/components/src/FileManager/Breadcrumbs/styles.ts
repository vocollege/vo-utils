import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    link: {
      cursor: "pointer",
    },
    ol: {
      // flexWrap: "nowrap"
    },
    li: {
      // whiteSpace: "nowrap"
    },
    progress: {
      width: "100%",
    },
    breacrumbsMenuWrapper: {},
  })
);
