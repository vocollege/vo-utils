import React from "react";
import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui//styles";
import Fade from "@mui/material/Fade";

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
