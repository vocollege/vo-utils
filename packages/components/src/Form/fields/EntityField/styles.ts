import {
    createStyles,
    Theme,
    makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative"
    },
    field: {
    },
    fieldInput: {
      paddingRight: theme.spacing(11)
    },
    button: {
      position: "absolute",
      right: 12,
      top: 12,
    },
    resetButton: {
      position: "absolute",
      right: 95,
      top: 5
    },
  })
);
