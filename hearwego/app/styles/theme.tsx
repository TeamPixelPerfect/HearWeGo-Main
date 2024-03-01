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

// export const getDesignTokens = (mode: PaletteMode) => ({
//     palette: {
//       mode,
//       ...(mode === 'light'
//         ? {
//             // palette values for light mode
//             primary: '#7e22ce',
//             text: {
//               primary: '#787878',
//               secondary: '#4B4B4B',
//             },
//           }
//         : {
//             // palette values for dark mode
//             primary: '#7e22ce',
//             background: {
//               default: '#171616',
//             },
//             text: {
//               primary: '#fff',
//               secondary: '#787878',
//             },
//           }),
//     },
// });

export const hearWeGoTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7e22ce",
      light :"#ffff"
    },

    background: {
      default: "#ffffff",
      paper: "#F3E8FF",
    },
    secondary: {
      main: "#4338ca",
    },

    background: {
      default: "#EEF2FF",
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
      light:"#000000"
    },
    secondary: {
      main: "#4338ca",
    },
    background: {
      default: "#0F172A",
      paper: "0F172A",
      
    },
    text: {
      primary: "#fff",
      secondary: "#787878",
    },
  },
});
