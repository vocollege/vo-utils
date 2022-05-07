import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { Theme } from "@mui/material/styles";

// declare module "@mui/styles/defaultTheme" {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
//   interface DefaultTheme extends Theme {}
// }

// declare module "@mui/styles" {
//   interface DefaultTheme extends Theme {}
// }

interface CustomColors {
  orangeLighter: string;
  orangeLight: string;
  orange: string;
  wineRedLight: string;
  wineRed: string;
  lilaLight: string;
  lila: string;
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    custom: CustomColors;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    extra: string;
  }
}

declare module "@mui/system/createTheme/shape" {
  interface Shape {
    borderRadiusMedium: number;
    borderRadiusBig: number;
    drawerWidth: number;
    drawerWidthMobile: number;
  }
}

// Lägg in style for knappar här
// Läs mer: https://material-ui.com/guides/typescript/#customization-of-theme

const options = {
  themeName: "VO-College Front 2.0",
  spacing: 8,
  palette: {
    // background: {
    //   default: "#fafafa",
    // },
    primary: {
      lighter: "#E6F0F7",
      // lighter: "#BFDDEF",
      light: "#80BCDF",
      main: "#0078BE",
      dark: "#005FAF",
      darker: "#004B96",
      contrastText: "#ffffff",
    },
    secondary: {
      lighter: "#DDF0E2", // VO Primary 2 25%
      light: "#BCE1C6", // VO Primary 2 50%
      main: "#78C38C", // VO Primary 2
      dark: "#41A55F", // VO Primary 2 Darker 1
      darker: "#1E9141", // VO Primary 2 Darker 2
      extra: "#F4F9F4", // VO Primary 2 extra
      contrastText: "#ffffff",
    },
    warning: {
      lighter: "#F7DFD0", // VO Secondary 2 25%
      light: "#F0BFA0", // VO Secondary 2 50%
      main: "#E07E41", // VO Secondary 1
    },
    success: { main: "#1E9141", contrastText: "#ffffff" },
    text: {
      primary: "#646464",
    },
    grey: {
      100: "#F0F0F0",
      300: "#B2B2B2",
      700: "#646464", // VO Secondary 4
    },
    custom: {
      orangeLighter: "#F7DFD0",
      orangeLight: "#F0BFA0",
      orange: "#E07E41",
      wineRedLight: "#C89DAA",
      wineRed: "#913C55",
      lilaLight: "#CABBD9",
      lila: "#9678B4",
    },
  },
  shape: {
    borderRadius: 8,
    borderRadiusMedium: 16,
    borderRadiusBig: 40,
    drawerWidth: 240,
    drawerWidthMobile: 64,
  },
  typography: {
    htmlFontSize: 18,
    fontSize: 18,
    fontFamily: "Lato, sans-serif",
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      // fontSize: "1.5rem",
      fontWeight: 600,
      // lineHeight: 1.33,
    },
    h5: {
      // fontSize: "1.40rem",
      fontWeight: 600,
      // lineHeight: 1.33,
    },
    h6: {
      fontWeight: 600,
      // lineHeight: 1.4,
    },
  },

  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",

    "0px 7px 18px -4px rgba(0,0,0,0.2)",
    "0px 10px 18px -10px rgba(0,0,0,0.2)",
    "0px 0px 18px 0px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgb(0, 0, 0, 0.2), 0px 10px 18px -10px rgb(0, 0, 0, 0.2)",
    "0px 8px 9px -5px rgb(0, 0, 0, 0.2) inset, 0px 10px 18px -10px rgb(0, 0, 0, 0.2) inset",
    "0px -14px 18px -10px rgba(0,0,0,0.12)",

    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  ],
};

// @note For some reason "options" gets a Typescript error when defining custom shadows,
// saying that the source value contains fewer elements than required.
// @ts-ignore
let theme = createTheme(options);
theme = responsiveFontSizes(theme);
export default theme;
