import {
    createStyles,
    Theme,
    makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    rowWrapper: {
      border: "1px solid red",
      marginBottom: theme.spacing(3)
    },
    rowDropArea: {
      height: 50,
      marginBottom: theme.spacing(2)
    },
    item: {
      
    }
  })
);
