import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

// Custom.
// import Logo from "./images/vocollege.svg";
// import LogoWhite from "./images/vocollege_white.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    logo: {
      height: "auto",
      maxWidth: "100%",
      opacity: 1,
      position: "absolute",
      right: 0,
      top: 0,
    },
  })
);

export interface VoLogoProps {
  color?: "normal" | "white";
  alt?: string;
  src?: string | null;
  srcWhite?: string | null;
}

const VoLogo: React.FC<VoLogoProps> = (props) => {
  const {
    color = "normal",
    alt = "VO-College",
    src = null,
    srcWhite = null,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {src && <img className={classes.logo} src={src} alt={alt} />}
      {srcWhite && (
        <Fade in={color === "white"}>
          <img className={classes.logo} src={srcWhite} alt={alt} />
        </Fade>
      )}
    </div>
  );
};
export default VoLogo;
