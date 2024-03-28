import { styled } from "@mui/material";
import { serviceItem } from "../constants/models";

const tranparentPaths = [
  "/",
  "/auth/artistSignUp",
  "/auth/artistSignUp/7",
  "/auth/artistSignUp/8",
  "/auth/artistSignUp/9",
  "/auth/artistSignIn",
  "/auth/signIn",
  "/auth/signUp",
];

export const HeaderContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "pathName",
})<{ pathName: string }>(({ theme, pathName }) => ({
  background: `${tranparentPaths.includes(pathName) ? "transparent" : "#000"}`,
  color: "#fff",
  maxHeight: "80px",
  display: "flex",
  alignItems: "center",
  padding: "1em 2em",
  position: "relative",
  zIndex: 99,
  justifyContent: "flex-start",
  "@media (max-width:960px)": {
    justifyContent: "space-between",
    padding: "2em 1em",
  },
}));
