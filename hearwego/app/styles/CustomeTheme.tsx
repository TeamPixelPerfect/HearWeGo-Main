"use client";
import { ThemeProvider } from "@mui/material/styles";
import { hearWeGoDarkTheme, hearWeGoTheme } from "./theme";
import {
  CssBaseline,
  PaletteMode,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const CustomeThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        if (localStorage.getItem("hwg-theme")) {
          localStorage.setItem(
            "hwg-theme",
            localStorage.getItem("hwg-theme") === "light" ? "dark" : "light"
          );
        } else {
          localStorage.setItem("hwg-theme", "dark");
        }
      },
    }),
    []
  );

  useEffect(() => {
    const localTheme = localStorage.getItem("hwg-theme");
    if (localTheme) {
      setMode(localTheme as PaletteMode);
    } 
  }, []);

  const theme = React.useMemo(
    () => (mode === "dark" ? hearWeGoDarkTheme : hearWeGoTheme),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomeThemeProvider;
