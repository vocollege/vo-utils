import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
      // "&:hover $actions": {
      //   backgroundColor: VoTheme.palette.common.white,
      // },
    },
    fieldWrapper: {
      flex: 1,
      position: "relative",
    },
    field: {
      flex: 1,
      "& .MuiFilledInput-root": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    // fieldInputElement: {
    //   borderTopRightRadius: 0,
    //   borderBottomRightRadius: 0,
    //   borderRight: "none",
    // },
    fieldInput: {
      paddingRight: VoTheme.spacing(8),
    },
    actions: {
      alignItems: "center",
      // backgroundColor: VoTheme.palette.grey[100],
      // backgroundColor: "rgba(0, 0, 0, 0.12)",
      borderRadius: `0 ${VoTheme.spacing(1)}px ${VoTheme.spacing(1)}px 0`,
      border: `1px solid ${VoTheme.palette.grey[300]}`,
      borderLeft: "none",
      display: "flex",
      padding: `10px 12px`,
      "& > *": {
        marginRight: theme.spacing(1),
        "&:last-child": {
          marginRight: 0,
        },
      },
    },
    button: {},
    // resetButton: {},
    // button: {
    //   position: "absolute",
    //   right: 12,
    //   top: 12,
    // },
    resetButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: 5,
    },
  })
);
