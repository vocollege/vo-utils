import { createStyles } from "@material-ui/core/styles";

// Custom.
import VoTheme from "../index";

export const stylesToast = createStyles({
  "@global": {
    ".Toastify__toast--default": {},
    ".Toastify__toast--info": {
      background: VoTheme.palette.primary.main,
    },
    ".Toastify__toast--success": {
      background: VoTheme.palette.secondary.darker,
    },
    ".Toastify__toast--warning": {
      background: VoTheme.palette.warning.main,
    },
    ".Toastify__toast--error": {
      background: VoTheme.palette.error.main,
    },
  },
});
