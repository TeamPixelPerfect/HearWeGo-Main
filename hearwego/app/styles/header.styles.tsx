import { styled } from "@mui/material";

export const HeaderContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "pathName",
})<{ pathName?: string }>(({ theme, pathName }) => ({
  background: `${pathName === "/" ? "transparent" : "#000"}`,
  color: "#fff",
  maxHeight: "60px",
  display: "flex",
  alignItems: "center",
  padding: "1em 2em",
  zIndex: 100,
  justifyContent: "flex-start",
  "@media (max-width:960px)": {
    justifyContent: "space-between",
    padding: "2em 1em",
  },
}));

