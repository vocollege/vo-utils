import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import clsx from "clsx";

// Custom.
import { useStyles } from "./styles";

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
