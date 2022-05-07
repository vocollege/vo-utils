import { alpha } from "@mui/material/styles";
import VoTheme from "./vocollege2";

// Note that we can't use Material UI createStyles() here, since we
// use this style on Editor.tsx, converting it to style string with
// jss.createStyleSheet() which is not TypeScript compatible with the
// returned type from createStyles()
export const stylesGlobal: any = {
  "@global": {
    ".grecaptcha-badge": {
      visibility: "hidden",
    },
    "body.vo-global__content": {
      fontFamily: "Lato, sans-serif",
      fontSize: VoTheme.typography.fontSize,
      margin: `0 auto`,
      maxWidth: 784,
      padding: VoTheme.spacing(1),
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
        [VoTheme.breakpoints.down("md")]: {
          float: "none",
          margin: `${VoTheme.spacing(2)}px auto`,
        },
      },
      "& .right": {
        float: "right",
        margin: `0 0 ${VoTheme.spacing(2)}px ${VoTheme.spacing(2)}px`,
        [VoTheme.breakpoints.down("md")]: {
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
          padding: VoTheme.spacing(1),
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
        marginTop: `${VoTheme.spacing(3)}px !important`,
      },
      "& img": {
        borderRadius: parseInt(`${VoTheme.shape.borderRadius}`) * 2,
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
        borderTop: `1px solid ${VoTheme.palette.secondary.light}`,
        marginBottom: VoTheme.spacing(4),
        marginTop: VoTheme.spacing(4),
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
        marginTop: VoTheme.spacing(2),
      },
      "& a, & a:visited": {
        color: VoTheme.palette.secondary.darker,
        fontWeight: 600,
        textDecoration: "none",
        "&:hover, &:active": {
          textDecoration: "underline",
        },
        "&.VoButton": {
          borderRadius: VoTheme.spacing(5),
          boxShadow: "none",
          // boxShadow: VoTheme.shadows[2],
          display: "inline-block",
          fontSize: VoTheme.typography.button.fontSize,
          padding: "8px 22px",
          margin: 5,
          minWidth: VoTheme.spacing(8),
          textAlign: "center",
          textTransform: "uppercase",
          "&:hover": {
            boxShadow: "none",
            // boxShadow: VoTheme.shadows[4],
            textDecoration: "none",
          },
        },
        "&.VoButton-green": {
          background: `linear-gradient(0deg, ${VoTheme.palette.secondary.dark} 0%, ${VoTheme.palette.secondary.main} 100%)`,
          color: VoTheme.palette.secondary.contrastText,
          "&:hover": {
            background: `linear-gradient(0deg, ${VoTheme.palette.secondary.dark} 0%, ${VoTheme.palette.secondary.main} 80%)`,
          },
          "&.VoButton-outlined": {
            background: "none",
            border: `2px solid ${VoTheme.palette.secondary.main}`,
            color: VoTheme.palette.secondary.main,
            "&:hover": {
              backgroundColor: alpha(VoTheme.palette.secondary.main, 0.04),
            },
          },
        },
        "&.VoButton-blue": {
          background: `linear-gradient(0deg, ${VoTheme.palette.primary.dark} 0%, ${VoTheme.palette.primary.main} 100%)`,
          color: VoTheme.palette.primary.contrastText,
          "&:hover": {
            background: `linear-gradient(0deg, ${VoTheme.palette.primary.dark} 0%, ${VoTheme.palette.primary.main} 80%)`,
          },
          "&.VoButton-outlined": {
            background: "none",
            border: `2px solid ${VoTheme.palette.primary.main}`,
            color: VoTheme.palette.primary.main,
            "&:hover": {
              backgroundColor: alpha(VoTheme.palette.primary.main, 0.04),
            },
          },
        },
      },
      "& h2, & h3, & h4": {
        color: VoTheme.palette.primary.main,
        marginBottom: 0,
        marginTop: 0,
        "& + p": {
          marginTop: VoTheme.spacing(2),
        },
      },
      "& h2, h3, h4": {
        "& + h2, & + h3, & + h4": {
          marginTop: VoTheme.spacing(3),
        },
      },
      "& *:not(h2):not(h3):not(h4)": {
        "& + h2, & + h3, & + h4": {
          marginTop: VoTheme.spacing(4),
        },
      },
      "& h2": {
        fontSize: VoTheme.typography.pxToRem(27),
        fontWeight: VoTheme.typography.h2.fontWeight,
        letterSpacing: VoTheme.typography.h2.letterSpacing,
        lineHeight: VoTheme.typography.h2.lineHeight,
        [VoTheme.breakpoints.up("sm")]: {
          fontSize: VoTheme.typography.pxToRem(30),
        },
        [VoTheme.breakpoints.up("md")]: {
          fontSize: VoTheme.typography.pxToRem(33),
        },
        [VoTheme.breakpoints.up("lg")]: {
          fontSize: VoTheme.typography.pxToRem(36),
        },
      },
      "& h3": {
        fontSize: VoTheme.typography.pxToRem(22),
        fontWeight: VoTheme.typography.h3.fontWeight,
        letterSpacing: VoTheme.typography.h3.letterSpacing,
        lineHeight: VoTheme.typography.h3.lineHeight,
        [VoTheme.breakpoints.up("sm")]: {
          fontSize: VoTheme.typography.pxToRem(25),
        },
        [VoTheme.breakpoints.up("md")]: {
          fontSize: VoTheme.typography.pxToRem(28),
        },
        [VoTheme.breakpoints.up("lg")]: {
          fontSize: VoTheme.typography.pxToRem(31),
        },
      },
      "& h4": {
        fontSize: VoTheme.typography.pxToRem(17),
        fontWeight: VoTheme.typography.h4.fontWeight,
        letterSpacing: VoTheme.typography.h4.letterSpacing,
        lineHeight: VoTheme.typography.h4.lineHeight,
        [VoTheme.breakpoints.up("sm")]: {
          fontSize: VoTheme.typography.pxToRem(20),
        },
        [VoTheme.breakpoints.up("md")]: {
          fontSize: VoTheme.typography.pxToRem(23),
        },
        [VoTheme.breakpoints.up("lg")]: {
          fontSize: VoTheme.typography.pxToRem(25),
        },
      },
      "& * + ul, & * + ol": {
        marginTop: VoTheme.spacing(3),
      },
      "& ul, & ol": {
        fontSize: VoTheme.typography.body1.fontSize,
        listStylePosition: "outside",
        marginLeft: 0,
        paddingLeft: VoTheme.spacing(5),
        paddingTop: 0,
      },
      // "& .preamble, & h2, & h3, & h4": {
      //   "& + ul, & + ol": {
      //     marginTop: VoTheme.spacing(3),
      //   },
      // },
      "& table": {
        borderCollapse: "collapse",
        borderWidth: 0,
        maxWidth: "100%",
        // "& tr": {
        //   // "&:nth-child(odd)": {
        //   //   backgroundColor: VoTheme.palette.secondary.extra,
        //   // },
        //   // "&:hover": {
        //   //   backgroundColor: VoTheme.palette.secondary.lighter,
        //   // },
        // },
        "& td, & th": {
          borderColor: VoTheme.palette.secondary.light,
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
      "& iframe": {
        maxWidth: "100%",
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
      backgroundColor: alpha(VoTheme.palette.primary.main, 0.98),
      bottom: 0,
      color: VoTheme.palette.primary.contrastText,
      left: 0,
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: VoTheme.zIndex.drawer,
    },
    ".vo-global__hide-scrollbars": {
      msOverflowStyle: "none", // for Internet Explorer, Edge
      scrollbarWidth: "none", // for Firefox
      "&::-webkit-scrollbar": {
        display: "none", // for Chrome, Safari, and Opera
      },
    },
    ".vo-global__mask-overflow": {
      maskImage:
        "-webkit-gradient(linear,80% top,right top,from(#000),to(transparent))",
      "& > *:last-child": {
        marginRight: VoTheme.spacing(3),
      },
    },
    ".vo-global__image-description": {
      color: VoTheme.palette.common.white,
      fontStyle: "italic",
      overflow: "hidden",
      padding: VoTheme.spacing(0.5),
      textOverflow: "ellipsis",
      textShadow: `0 0 4px ${VoTheme.palette.common.black}`,
      whiteSpace: "nowrap",
    },
  },
};
