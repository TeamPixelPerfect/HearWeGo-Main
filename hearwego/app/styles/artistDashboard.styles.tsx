"use client";
import { styled } from "@mui/material";
import Link from "next/link";

export const ArtistDashboardLayout = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  background: theme.palette.background.default,
  ".ad-left": {
    width: "16%",
    minWidth: "60px",
    height: "100vh",
  },
  ".ad-right": {
    width: "84%",
    maxWidth: "100%",
    minWidth: "800px",
    padding: "1em 1em 1em 0",
    marginLeft: "1em"
  },
  "@media (max-width:960px)": {
    ".ad-left" : {
      width: "60px",
    }
  },
  
}));

export const ArtistDashboardSideNavContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",  
    alignItems:"center",
    padding: "0.5em 0",
    background: "#F3E8FF",
    minHeight: "100%",
    minWidth: "60px",
    width: "inherit",
    // height: "fit-content",
    position:"fixed",
    zIndex: "10",
    borderRadius: "0 30px 0 0",
    boxShadow: "1px 1px 3px rgba(0,0,0,0.2)",
    // transition: "width 1s",
    // transform: "translateX(-100%)",
    a: {
        textDecoration: "none",
        display: "flex",
        div : {
          color: "#4B4B4B",
          fontWeight: "500",
          fontSize: "14px",
        }
    },
}));

export const ADNavItemGroupBox = styled("div")(({ theme }) => ({
    margin: "0.5em 1em",
    // background: "rgba(0,0,0,.2)",
    "& label": {
        color: "#6366F1",
        fontSize: "16px",
        fontStyle: "italic",
        marginBottom: "1em",
        // padding: "0 16px",
        fontFamily: "Dancing Script",
        // textDecoration: "underline", 
    }
}));

export const ADNavItemBox = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "2px 16px 2px 0",
    marginBottom: "0.2em",
    width:"100%",
    cursor:"Pointer",
    "&:hover": {
        background: "rgba(99,102,242,.2)",
    },
    "@media (max-width:960px)": {
        padding: "4px",
        width: "fit-content",
    },
}));
