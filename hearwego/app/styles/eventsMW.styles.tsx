"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
//import { theme } from "@/app/styles/theme";

export const Maindiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  height: "100%",
}));

export const CoverCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "500px",
  marginTop: "0px",
  position: "relative",
  display: "flex",
  backgroundSize: "cover",
  backgroundPosition: "center",
  
}));

export const CaptionBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  width: "90%",
  height: "35%",
  padding: "1em",
  margin: "0px 0px 0px 2%",
  //backgroundColor:'blue',
  top: "60%",
  flexDirection: "column",
}));

export const Caption01Box = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  fontSize: "56px",
  //fontFamily: "Roboto",
  fontWeight: "bold",
  color: "primary.main",
  textAlign: "center",
  //backgroundColor:'yellow'
}));

export const Caption02Box = styled(Box)(({ theme }) => ({
  height: "100%",
  padding: "8px 0px 0px 0px",
  position: "relative",
  display: "flex",
  fontSize: "32px",
  //fontFamily: "Roboto",
  fontWeight: "semi-bol",
  color: "#A5B4FC",
  textAlign: "center",
  //backgroundColor:'red'
}));
export const Caption03Box = styled(Box)(({ theme }) => ({
  height: "100%",
  //backgroundColor: "black",
  fontSize: "40px",
  marginLeft: "8px",
  fontWeight: "bold",
  color: "primary.main",
}));

export const SearchPaper = styled(Paper)(({ theme }) => ({
  component: "form",
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  borderRadius: "90px",
  height: "40px",
  position: "relative",
}));
