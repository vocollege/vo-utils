import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
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
    fieldInput: {
      backgroundColor: VoTheme.palette.common.white,
      paddingRight: VoTheme.spacing(8),
    },
    actions: {
      alignItems: "center",
      backgroundColor: VoTheme.palette.common.white,
      borderRadius: `0 ${VoTheme.spacing(1)} ${VoTheme.spacing(1)} 0`,
      border: `1px solid ${VoTheme.palette.grey[300]}`,
      borderLeft: "none",
      display: "flex",
      padding: `10px 12px`,
      "& > *": {
        marginRight: VoTheme.spacing(1),
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
      right: VoTheme.spacing(1),
      top: 5,
    },
  })
);
