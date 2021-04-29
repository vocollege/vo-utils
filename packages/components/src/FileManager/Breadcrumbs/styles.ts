import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

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
