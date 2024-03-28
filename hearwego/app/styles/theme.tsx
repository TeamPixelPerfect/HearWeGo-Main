"use client";
import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { amber, grey, deepOrange } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

export const hearWeGoTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7e22ce",
      light: "#ffff",
      dark: "#6b21a8",
    },
    background: {
      default: "#ffffff",
      paper: "#F5F5F5",
    },
    secondary: {
      main: "#4338ca",
      light: "#6366f1",
      dark:"#3730a3",
    },

    text: {
      primary: "#787878",
      secondary: "#4B4B4B",
    },
  },
});

export const hearWeGoDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7e22ce",
      light: "#000000",
    },
    secondary: {
      main: "#818cf8",
    },
    background: {
      default: "#0F172A",
      paper: "#121212",
    },
    text: {
      primary: "#fff",
      secondary: "#787878",
    },
  },
});
