import { alpha, createStyles } from "@material-ui/core/styles";

import VoTheme from "../index";

export const stylesReddit = createStyles({
  root: {
    // border: "1px solid #e2e2e1",
    border: `1px solid ${VoTheme.palette.grey[300]}`,
    overflow: "hidden",
    borderRadius: VoTheme.spacing(1),
    // backgroundColor: "#fcfcfb",
    backgroundColor: VoTheme.palette.grey[100],
    outline: "none",
    transition: VoTheme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: VoTheme.palette.background.paper,
    },
    "&$focused": {
      backgroundColor: VoTheme.palette.background.paper,
      boxShadow: `${alpha(VoTheme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: VoTheme.palette.primary.main,
      "&$error": {
        boxShadow: `${alpha(VoTheme.palette.error.dark, 0.25)} 0 0 0 2px`,
        borderColor: VoTheme.palette.error.dark,
      },
    },
    "&$error": {
      borderColor: VoTheme.palette.error.dark,
    },
  },
  focused: {},
  error: {},
});
