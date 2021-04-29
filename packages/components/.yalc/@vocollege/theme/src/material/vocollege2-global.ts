import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import VoTheme from "./vocollege2";

export const stylesGlobal = createStyles({
  "@global": {
    ".vo-global__content": {
      color: VoTheme.palette.text.primary,
      position: "relative",
      "& *:last-child": {
        marginBottom: 0,
      },
      "& .left": {
        float: "left",
        margin: `0 ${VoTheme.spacing(2)}px ${VoTheme.spacing(2)}px 0`,
      },
      "& .right": {
        float: "right",
        margin: `0 0 ${VoTheme.spacing(2)}px ${VoTheme.spacing(2)}px`,
      },
      "& img": {
        borderRadius: VoTheme.shape.borderRadius,
        height: "auto",
        maxWidth: "100%",
        "&.fullwidth": {
          width: "100%",
        },
        "&.half": {
          width: 392,
        },
        "&.small": {
          width: 196,
        },
        "&.square-half": {
          height: 392,
          objectFit: "cover",
          width: 392,
        },
        "&.square-small": {
          height: 196,
          objectFit: "cover",
          width: 196,
        },
      },
      "& p": {
        fontSize: VoTheme.typography.body1.fontSize,
        "&.preamble": {
          fontSize: VoTheme.typography.h6.fontSize,
          lineHeight: VoTheme.typography.h6.lineHeight,
        },
      },
      "& a, & a:visited": {
        color: VoTheme.palette.secondary.darker,
        fontWeight: 600,
        textDecoration: "none",
        "&:hover, &:active": {
          textDecoration: "underline",
        },
      },
      "& h2, & h3, & h4": {
        color: VoTheme.palette.primary.main,
        marginBottom: VoTheme.spacing(3),
        marginTop: 0,
        "& + p": {
          marginTop: VoTheme.spacing(3),
        },
      },
      "& * + h2, & * + h3, & * + h4": {
        marginTop: VoTheme.spacing(5),
      },
      "& h2": {
        fontSize: VoTheme.typography.h2.fontSize,
        fontWeight: VoTheme.typography.h2.fontWeight,
        letterSpacing: VoTheme.typography.h2.letterSpacing,
        lineHeight: VoTheme.typography.h2.lineHeight,
      },
      "& h3": {
        fontSize: VoTheme.typography.h3.fontSize,
        fontWeight: VoTheme.typography.h3.fontWeight,
        letterSpacing: VoTheme.typography.h3.letterSpacing,
        lineHeight: VoTheme.typography.h3.lineHeight,
      },
      "& h4": {
        fontSize: VoTheme.typography.h4.fontSize,
        fontWeight: VoTheme.typography.h4.fontWeight,
        letterSpacing: VoTheme.typography.h4.letterSpacing,
        lineHeight: VoTheme.typography.h4.lineHeight,
      },
    },
    ".vo-global__modal": {
      backgroundColor: fade(VoTheme.palette.primary.main, 0.98),
      bottom: 0,
      color: VoTheme.palette.primary.contrastText,
      left: 0,
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: VoTheme.zIndex.drawer,
    },
  },
});
