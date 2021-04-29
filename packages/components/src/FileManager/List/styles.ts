import {
    createStyles,
    Theme,
    makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({    
    // nothingFound: {
    //   alignItems: "center",
    //   display: "flex",
    //   height: "30vh",
    //   justifyContent: "center",
    //   padding: theme.spacing(1)
    // },
    rowRoot: {
      "&$rowHover:hover": {
        backgroundColor: theme.palette.grey[100],
        "& $actions": {
          opacity: 1
        }
      }
    },
    rowHover: {
      cursor: "pointer",
      transition: "background-color 200ms ease"
    },
    type: {
      width: 100
    },
    actions: {
      display: "flex",
      opacity: 0,
      transition: "opacity 200ms ease"
    },

    "@global": {
      ".vo-global__file-manager-column-date": {
        fontSize: theme.typography.caption.fontSize,
        width: 125
      },
      ".vo-global__file-manager-column-description": {
        fontSize: theme.typography.caption.fontSize,
        width: 200
      }
    }

    
  })
);

