import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

export const useStylesGlobal = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      ".vo-global__content": {
        color: theme.palette.text.primary,
        position: "relative",
        "& *:last-child": {
          marginBottom: 0,
        },
        "& .left": {
          float: "left",
          margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
        },
        "& .right": {
          float: "right",
          margin: `0 0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
        "& img": {
          borderRadius: theme.shape.borderRadius,
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
          fontSize: theme.typography.body1.fontSize,
          "&.preamble": {
            fontSize: theme.typography.h6.fontSize,
            lineHeight: theme.typography.h6.lineHeight,
          },
        },
        "& a, & a:visited": {
          color: theme.palette.secondary.darker,
          fontWeight: 600,
          textDecoration: "none",
          "&:hover, &:active": {
            textDecoration: "underline",
          },
        },
        "& h2, & h3, & h4": {
          color: theme.palette.primary.main,
          marginBottom: theme.spacing(3),
          marginTop: 0,
          "& + p": {
            marginTop: theme.spacing(3),
          },
        },
        "& * + h2, & * + h3, & * + h4": {
          marginTop: theme.spacing(5),
        },
        "& h2": {
          fontSize: theme.typography.h2.fontSize,
          fontWeight: theme.typography.h2.fontWeight,
          letterSpacing: theme.typography.h2.letterSpacing,
          lineHeight: theme.typography.h2.lineHeight,
        },
        "& h3": {
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.h3.fontWeight,
          letterSpacing: theme.typography.h3.letterSpacing,
          lineHeight: theme.typography.h3.lineHeight,
        },
        "& h4": {
          fontSize: theme.typography.h4.fontSize,
          fontWeight: theme.typography.h4.fontWeight,
          letterSpacing: theme.typography.h4.letterSpacing,
          lineHeight: theme.typography.h4.lineHeight,
        },
      },
      ".vo-global__modal": {
        backgroundColor: fade(theme.palette.primary.main, 0.98),
        bottom: 0,
        color: theme.palette.primary.contrastText,
        left: 0,
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: theme.zIndex.drawer,
      },
    },
  })
);
