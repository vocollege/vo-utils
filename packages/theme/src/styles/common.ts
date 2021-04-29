import { createStyles } from "@material-ui/core/styles";

// Custom.
import VoTheme from "../index";

export const fieldBoxProps = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
  borderColor: "text.disabled",
  margin: 0,
  padding: VoTheme.spacing(2, 2),
  borderRadius: 4,
};

export const stylesCommon = createStyles({
  badgetError: {
    backgroundColor: VoTheme.palette.error.main,
  },
  "@global": {
    "@keyframes myEffect": {
      "0%": {
        opacity: 1,
      },
      "40%": {
        opacity: 0.6,
      },
      "80%": {
        opacity: 1,
      },
    },
    ".vo-global__fake-element": {
      animation: `$myEffect infinite 1500ms ease`,
      display: "block",
      backgroundColor: VoTheme.palette.grey[300],
      height: "20px",
    },

    ".vo-global__content-toolbar": {
      backgroundColor: VoTheme.palette.background.paper,
      boxShadow: VoTheme.shadows[10],
      left: VoTheme.shape.drawerWidth,
      position: "fixed",
      right: 0,
      top: VoTheme.spacing(8),
      zIndex: VoTheme.zIndex.appBar,
      [VoTheme.breakpoints.up("md")]: {
        minHeight: VoTheme.spacing(7) + 4,
      },
    },
    ".vo-global__content-with-toolbar": {
      marginTop: VoTheme.spacing(10) + 4,
      padding: VoTheme.spacing(4),
    },
    ".vo-global__content-bottom-area": {
      backgroundColor: VoTheme.palette.background.paper,
      bottom: 0,
      boxShadow: VoTheme.shadows[10],
      left: VoTheme.shape.drawerWidth,
      padding: VoTheme.spacing(3),
      position: "fixed",
      right: 0,
      zIndex: VoTheme.zIndex.appBar,
      [VoTheme.breakpoints.up("md")]: {
        minHeight: VoTheme.spacing(15),
      },
    },
    ".vo-global__nothing-found": {
      alignItems: "center",
      display: "flex",
      height: "30vh",
      justifyContent: "center",
      padding: VoTheme.spacing(1),
    },
  },
});

// Look here: https://stackoverflow.com/questions/52246088/create-common-style-classes-for-jss-in-material-ui
// export const common = (theme: Theme) => ({
//   badget
// });
