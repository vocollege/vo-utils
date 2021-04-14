import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.background.paper,
    },
    noOverlay: {
      position: "fixed",
      right: theme.spacing(4),
      top: theme.spacing(17),
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

interface VoLoaderProps {
  noOverlay?: boolean;
}

const VoLoader: React.FC<VoLoaderProps> = (props) => {
  const { noOverlay } = props;
  const classes = useStyles();
  return (
    <>
      {!noOverlay && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {noOverlay && (
        <div className={classes.noOverlay}>
          <CircularProgress color="primary" />
        </div>
      )}
    </>
  );
};

export default VoLoader;
