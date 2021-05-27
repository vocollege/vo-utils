// import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import theme from "./vocollege2";

import VoTheme from "./vocollege2";

// Note that we can't use Material UI createStyles() here, since we
// use this style on Editor.tsx, converting it to style string with
// jss.createStyleSheet() which is not TypeScript compatible the
// returned type from createStyles()
export const stylesGlobal = {
  "@global": {
    "body.vo-global__content": {
      fontFamily: "Lato, sans-serif",
      fontSize: VoTheme.typography.fontSize,
      margin: `0 auto`,
      maxWidth: 784,
    },
    ".vo-global__content": {
      color: VoTheme.palette.text.primary,
      position: "relative",
      wordBreak: "break-word",
      "& *:last-child": {
        marginBottom: 0,
      },
      "& .alignleft": {
        textAlign: "left",
      },
      "& .alignright": {
        textAlign: "right",
      },
      "& .aligncenter": {
        textAlign: "center",
      },
      "& .alignfull": {
        textAlign: "justify",
      },
      "& .left": {
        float: "left",
        margin: `0 ${VoTheme.spacing(2)}px ${VoTheme.spacing(2)}px 0`,
        [theme.breakpoints.down("sm")]: {
          float: "none",
          margin: `${VoTheme.spacing(2)}px auto`,
        },
      },
      "& .right": {
        float: "right",
        margin: `0 0 ${VoTheme.spacing(2)}px ${VoTheme.spacing(2)}px`,
        [theme.breakpoints.down("sm")]: {
          float: "none",
          margin: `${VoTheme.spacing(2)}px auto`,
        },
      },
      "& .center": {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      },
      "& .grid": {
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        padding: 0,
        "& > *": {
          padding: theme.spacing(1),
        },
        "&.left": {
          float: "none",
          justifyContent: "flex-start",
          margin: 0,
        },
        "&.center": {
          justifyContent: "center",
          margin: 0,
        },
        "&.right": {
          float: "none",
          justifyContent: "flex-end",
          margin: 0,
        },
      },
      "& * + .grid": {
        marginTop: `${theme.spacing(3)}px !important`,
      },
      "& img": {
        borderRadius: VoTheme.shape.borderRadius * 2,
        display: "block",
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
        "&.landscape-half": {
          height: 220,
          objectFit: "cover",
          width: 392,
        },
        "&.landscape-small": {
          height: 110,
          objectFit: "cover",
          width: 196,
        },
        "&.portrait-half": {
          height: 300,
          objectFit: "cover",
          width: 220,
        },
        "&.portrait-small": {
          height: 150,
          objectFit: "cover",
          width: 110,
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
        "&.circle": {
          borderRadius: "100%",
        },
        "&.position-center": {
          objectPosition: "center",
        },
        "&.position-bottom": {
          objectPosition: "bottom",
        },
        "&.position-left": {
          objectPosition: "left",
        },
        "&.position-right": {
          objectPosition: "right",
        },
        "&.position-top": {
          objectPosition: "top",
        },
      },
      "& hr": {
        borderTop: `1px solid ${theme.palette.secondary.light}`,
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
      },
      "& p": {
        fontSize: VoTheme.typography.body1.fontSize,
        margin: 0,
        padding: 0,
        "&.preamble": {
          fontSize: VoTheme.typography.h6.fontSize,
          lineHeight: VoTheme.typography.h6.lineHeight,
        },
      },
      "& * + p, * + table": {
        marginTop: VoTheme.spacing(3),
      },
      "& a, & a:visited": {
        color: VoTheme.palette.secondary.darker,
        fontWeight: 600,
        textDecoration: "none",
        "&:hover, &:active": {
          textDecoration: "underline",
        },
        "&.VoButton": {
          borderRadius: theme.spacing(5),
          boxShadow: "none",
          // boxShadow: theme.shadows[2],
          display: "inline-block",
          fontSize: theme.typography.button.fontSize,
          padding: "8px 22px",
          margin: 5,
          minWidth: theme.spacing(8),
          textAlign: "center",
          textTransform: "uppercase",
          "&:hover": {
            boxShadow: "none",
            // boxShadow: theme.shadows[4],
            textDecoration: "none",
          },
        },
        "&.VoButton-green": {
          background: `linear-gradient(0deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
          color: theme.palette.secondary.contrastText,
          "&:hover": {
            background: `linear-gradient(0deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 80%)`,
          },
          "&.VoButton-outlined": {
            background: "none",
            border: `2px solid ${theme.palette.secondary.main}`,
            color: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: fade(theme.palette.secondary.main, 0.04),
            },
          },
        },
        "&.VoButton-blue": {
          background: `linear-gradient(0deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            background: `linear-gradient(0deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 80%)`,
          },
          "&.VoButton-outlined": {
            background: "none",
            border: `2px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: fade(theme.palette.primary.main, 0.04),
            },
          },
        },
      },
      "& h2, & h3, & h4": {
        color: VoTheme.palette.primary.main,
        marginBottom: 0,
        marginTop: 0,
        "& + p": {
          marginTop: VoTheme.spacing(3),
        },
      },
      "& h2, h3, h4": {
        "& + h2, & + h3, & + h4": {
          marginTop: theme.spacing(3),
        },
      },
      "& *:not(h2):not(h3):not(h4)": {
        "& + h2, & + h3, & + h4": {
          marginTop: VoTheme.spacing(6),
        },
      },
      "& h2": {
        fontSize: VoTheme.typography.pxToRem(29),
        fontWeight: VoTheme.typography.h2.fontWeight,
        letterSpacing: VoTheme.typography.h2.letterSpacing,
        lineHeight: VoTheme.typography.h2.lineHeight,
        [theme.breakpoints.up("sm")]: {
          fontSize: VoTheme.typography.pxToRem(32),
        },
        [theme.breakpoints.up("md")]: {
          fontSize: VoTheme.typography.pxToRem(35),
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: VoTheme.typography.pxToRem(38),
        },
      },
      "& h3": {
        fontSize: VoTheme.typography.pxToRem(24),
        fontWeight: VoTheme.typography.h3.fontWeight,
        letterSpacing: VoTheme.typography.h3.letterSpacing,
        lineHeight: VoTheme.typography.h3.lineHeight,
        [theme.breakpoints.up("sm")]: {
          fontSize: VoTheme.typography.pxToRem(27),
        },
        [theme.breakpoints.up("md")]: {
          fontSize: VoTheme.typography.pxToRem(30),
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: VoTheme.typography.pxToRem(33),
        },
      },
      "& h4": {
        fontSize: VoTheme.typography.pxToRem(19),
        fontWeight: VoTheme.typography.h4.fontWeight,
        letterSpacing: VoTheme.typography.h4.letterSpacing,
        lineHeight: VoTheme.typography.h4.lineHeight,
        [theme.breakpoints.up("sm")]: {
          fontSize: VoTheme.typography.pxToRem(22),
        },
        [theme.breakpoints.up("md")]: {
          fontSize: VoTheme.typography.pxToRem(25),
        },
        [theme.breakpoints.up("lg")]: {
          fontSize: VoTheme.typography.pxToRem(28),
        },
      },
      "& table": {
        borderCollapse: "collapse",
        borderWidth: 0,
        // "& tr": {
        //   // "&:nth-child(odd)": {
        //   //   backgroundColor: VoTheme.palette.secondary.extra,
        //   // },
        //   // "&:hover": {
        //   //   backgroundColor: VoTheme.palette.secondary.lighter,
        //   // },
        // },
        "& td, & th": {
          borderColor: theme.palette.secondary.light,
          padding: VoTheme.spacing(2),
        },
        "&.table-hover": {
          "& tr:hover": {
            backgroundColor: VoTheme.palette.secondary.lighter,
          },
        },
        "&.table-zebra": {
          "& tr:nth-child(odd)": {
            backgroundColor: VoTheme.palette.secondary.extra,
          },
        },
      },
      // "& [class^='grid-'], & [class*=' grid-']": {
      //   alignItems: "center",
      //   display: "flex",
      //   flexWrap: "wrap",
      //   justifyContent: "center",
      // },
      // "& .grid-2": {
      //   "& > *": {
      //     flexBasis: "50%",
      //     [theme.breakpoints.down("sm")]: {
      //       flexBasis: "100%",
      //     },
      //   },
      // },
      // "& .grid-3": {
      //   "& > *": {
      //     flexBasis: "33%",
      //     [theme.breakpoints.down("md")]: {
      //       flexBasis: "50%",
      //     },
      //     [theme.breakpoints.down("sm")]: {
      //       flexBasis: "100%",
      //     },
      //   },
      // },
      // "& .grid-4": {
      //   "& > *": {
      //     flexBasis: "25%",
      //     [theme.breakpoints.down("md")]: {
      //       flexBasis: "50%",
      //     },
      //     [theme.breakpoints.down("sm")]: {
      //       flexBasis: "100%",
      //     },
      //   },
      // },
      // "& .grid-5": {
      //   "& > *": {
      //     flexBasis: "20%",
      //     [theme.breakpoints.down("lg")]: {
      //       flexBasis: "33%",
      //     },
      //     [theme.breakpoints.down("md")]: {
      //       flexBasis: "50%",
      //     },
      //     [theme.breakpoints.down("sm")]: {
      //       flexBasis: "100%",
      //     },
      //   },
      // },
      // "& .grid-6": {
      //   "& > *": {
      //     flexBasis: "16%",
      //     [theme.breakpoints.down("lg")]: {
      //       flexBasis: "25%",
      //     },
      //     [theme.breakpoints.down("md")]: {
      //       flexBasis: "50%",
      //     },
      //     [theme.breakpoints.down("sm")]: {
      //       flexBasis: "100%",
      //     },
      //   },
      // },
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
};
