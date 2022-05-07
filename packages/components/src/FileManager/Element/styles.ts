import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

// Colors.
import {
  brown,
  blue,
  green,
  grey,
  purple,
  red,
  yellow,
  blueGrey,
} from "@mui/material/colors";

// Custom.
import VoTheme from "@vocollege/theme";

export const useStyles = makeStyles(
  createStyles({
    root: {
      border: "2px dotted transparent",
      borderRadius: VoTheme.spacing(1),
      display: "flex",
      flexDirection: "column",
      maxWidth: "100%",
      padding: VoTheme.spacing(1),
      width: "100%",
      zIndex: 0,
    },
    selected: {
      color: VoTheme.palette.secondary.dark,
      backgroundColor: VoTheme.palette.background.paper,
      borderRadius: VoTheme.shape.borderRadius,
      boxShadow: VoTheme.shadows[10],
      marginLeft: `-${VoTheme.spacing(1)}`,
      marginBottom: -58,
      marginTop: `-${VoTheme.spacing(1)}`,
      minWidth: `calc(100% + ${VoTheme.spacing(2)})`,
      paddingTop: VoTheme.spacing(2),
      zIndex: VoTheme.zIndex.speedDial,
    },
    iconRoot: {
      fontSize: VoTheme.typography.h1.fontSize,
    },
    titleRoot: {
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    focusVisible: {
      borderColor: VoTheme.palette.primary.dark,
    },
    details: {
      fontSize: VoTheme.typography.body1.fontSize,
      padding: VoTheme.spacing(1),
      paddingTop: VoTheme.spacing(2),
    },
    actions: {
      // border: `0 solid ${VoTheme.palette.divider}`,
      // borderBottomWidth: 1,
      // borderTopWidth: 1,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    badge: {
      // boxShadow: VoTheme.shadows[10],
      border: `1px solid ${VoTheme.palette.background.paper}`,
      paddingBottom: 2,
      textTransform: "uppercase",
    },
    portfolioIcon: {
      color: brown[500],
    },
    folderIcon: {
      color: yellow[800],
    },
    imageBadge: {
      backgroundColor: purple[500],
    },
    imageBadgeWithIcon: {
      backgroundColor: "transparent !important",
    },
    imageIcon: {
      color: purple[500],
    },
    image: {
      borderRadius: VoTheme.shape.borderRadius,
      height: "auto",
      marginBottom: VoTheme.spacing(1),
      maxHeight: VoTheme.spacing(7),
      maxWidth: VoTheme.spacing(7),
    },
    pdfBadge: {
      backgroundColor: red[500],
    },
    pdfIcon: {
      color: red[500],
    },
    sheetBadge: {
      backgroundColor: green[500],
    },
    sheetIcon: {
      color: green[500],
    },
    documentBadge: {
      backgroundColor: blue[800],
    },
    documentIcon: {
      color: blue[800],
    },
    videoBadge: {
      backgroundColor: blueGrey[700],
    },
    videoIcon: {
      color: blueGrey[700],
    },
    defaultBadge: {
      backgroundColor: grey[800],
    },
    defaultIcon: {
      color: grey[800],
    },
  })
);
