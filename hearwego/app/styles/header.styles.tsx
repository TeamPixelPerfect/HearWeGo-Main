import { styled } from "@mui/material";
import { serviceItem } from "../constants/models";

export const HeaderContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "pathName",
})<{ pathName?: string }>(({ theme, pathName }) => ({
  background: `${pathName === "/" ? "transparent" : "#000"}`,
  color: "#fff",
  maxHeight: "80px",
  display: "flex",
  alignItems: "center",
  padding: "1em 2em",
  position:"relative",
  zIndex: 99,
  justifyContent: "flex-start",
  "@media (max-width:960px)": {
    justifyContent: "space-between",
    padding: "2em 1em",
  },
}));
