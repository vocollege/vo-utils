import { createStyles } from "@material-ui/core/styles";

// Custom.
import VoTheme from "../index";

export const stylesLayout = createStyles({
  "@global": {
    ".vo-global__top-bottom-space": {
      paddingBottom: VoTheme.spacing(3),
      paddingTop: VoTheme.spacing(3),
    },
  },
});
