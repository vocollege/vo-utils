import { createStyles } from "@mui/styles";

// Custom.
import VoTheme from "../index";

export const stylesToast = createStyles({
  "@global": {
    ":root": {
      "--toastify-color-info": VoTheme.palette.primary.main,
      "--toastify-color-success": VoTheme.palette.secondary.darker,
      "--toastify-color-warning": VoTheme.palette.warning.main,
      "--toastify-color-error": VoTheme.palette.error.main,
    },
    // ".Toastify__toast-theme--colored": {
    //   "& .Toastify__toast--default": {},
    //   "& .Toastify__toast--info": {
    //     background: VoTheme.palette.primary.main,
    //   },
    //   "& .Toastify__toast--success": {
    //     background: VoTheme.palette.secondary.darker,
    //   },
    //   "& .Toastify__toast--warning": {
    //     background: VoTheme.palette.warning.main,
    //   },
    //   "& .Toastify__toast--error": {
    //     background: VoTheme.palette.error.main,
    //   },
    // },
  },
});
