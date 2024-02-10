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
    padding: "1em",
    // background: "blue"
  },
  
}));

export const ArtistDashboardSideNavContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",    
    padding: "1em 2em",
    background: "#F3E8FF",
    minHeight: "100%",
    height: "fit-content",
    a: {
        textDecoration: "none",
        color: "#4B4B4B",
        // margin: "0.5em 0",
        fontWeight: "500",
        fontSize: "14px",
    },
}));

export const ADNavItemGroupBox = styled("div")(({ theme }) => ({
    margin: "1.2em 0",
    // background: "rgba(0,0,0,.2)",
    "& label": {
        color: "#6366F1",
        fontSize: "16px",
        fontStyle: "italic",
        marginBottom: "1em",
        padding: "0 16px",
        fontFamily: "Dancing Script",
        // textDecoration: "underline", 
    }
}));

export const ADNavItemBox = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "4px 16px",
    // background: "rgba(0,0,0,.2)",
    marginBottom: "0.2em",
    width:"100%",
    // borderRadius: "10px",
    cursor:"Pointer",
    // borderBottom: "1px solid #fff"
    "&:hover": {
        background: "rgba(99,102,242,.2)",
    }
}));

