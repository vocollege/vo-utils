import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      color: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      zIndex: theme.zIndex.drawer + 2,
    },
    noOverlay: {
      alignItems: "center",
      color: theme.palette.primary.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "fixed",
      right: theme.spacing(4),
      top: theme.spacing(17),
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      marginTop: theme.spacing(2),
    },
  })
);

interface VoLoaderProps {
  className?: string;
  noOverlay?: boolean;
  title?: string;
}

const VoLoader: React.FC<VoLoaderProps> = (props) => {
  const { className, noOverlay, title } = props;
  const classes = useStyles();

  const getLoader = () => {
    return (
      <>
        <CircularProgress color="inherit" />
        {title && (
          <Typography
            color="inherit"
            component="p"
            variant="h6"
            className={classes.title}
          >
            {title}
          </Typography>
        )}
      </>
    );
  };

  return (
    <>
      {!noOverlay && (
        <Backdrop className={clsx(classes.backdrop, className)} open={true}>
          {getLoader()}
        </Backdrop>
      )}
      {noOverlay && (
        <div className={clsx(classes.noOverlay, className)}>{getLoader()}</div>
      )}
    </>
  );
};

export default VoLoader;
