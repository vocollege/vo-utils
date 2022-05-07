import { createStyles } from "@mui/styles";

import VoTheme from "../index";

export const stylesActions = createStyles({
  badgetError: {
    backgroundColor: VoTheme.palette.error.main,
  },
  "@global": {
    ".vo-global__actions-button-confirm": {
      position: "relative",
    },
    ".vo-global__actions-button-confirm-label": {},
    ".vo-global__actions-loading": {
      "& .vo-global__actions-button-confirm-label": {
        opacity: 0,
      },
    },
    ".vo-global__actions-button-create-loading": {
      position: "absolute",
    },
    ".vo-global__actions-floating-button": {
      bottom: VoTheme.spacing(2),
      position: "fixed !important",
      right: VoTheme.spacing(2),
      zIndex: VoTheme.zIndex.drawer + 1,
    },
  },
});
