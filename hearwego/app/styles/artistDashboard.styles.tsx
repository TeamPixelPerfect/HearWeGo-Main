"use client";
import { styled } from "@mui/material";

export const ArtistDashboardLayout = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  ".ad-left": {
    width: "20%",
    height: "100vh",
    background: "#F3E8FF",
    // position: "fixed",
  },
  ".ad-right": {
    width: "100%",
    // background: "blue"
  },
}));
