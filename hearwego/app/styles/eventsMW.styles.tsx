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
 // backgroundColor:'blue',
  top: "60%",
  flexDirection: "column",
}));

export const Caption01Box = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  fontSize: "56px",
  //fontFamily: "Roboto",
  fontWeight: "bold",
  color: "white",
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
  color: "white",
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


//Single event page Styles

export const CoverEventCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "400px",
  marginTop: "0px",
  position: "relative",
  display: "flex",
  backgroundRepeat:'repeat-x',
  
  //backgroundPosition: "center",
  flexDirection:'row'
}));

export const EventBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  width: "40%",
  height: "35%",
  padding: "1em",
  margin: "0px 0px 0px 2%",
   //backgroundColor:'blue',
  top: "60%",
  flexDirection: "column",
}));
export const EventNameBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  fontSize: "56px",
  //fontFamily: "Roboto",
  fontWeight: "bold",
  color: "white",
  textAlign: "center",
  //backgroundColor:'yellow'
}));

export const ArtistNameBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width:'100%',
  //padding: "8px 0px 0px 0px",
  position: "relative",
  display: "flex",
  fontSize: "32px",
  //fontFamily: "Roboto",
  fontWeight: "semi-bol",
  color: "#A5B4FC",
  textAlign: "center",
  //backgroundColor:'red'
}));
export const OptionBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "30%",
  top: "80%",
  left: "70%",
  //backgroundColor:'yellow',
  alignItems:'right'
  
}));
export const MiddleEventImageBox = styled(Box)(({ theme }) => ({
  width: "20%",
  height: "90%",
  //backgroundColor: "red",
  padding: "10px",
  //margin: "10px",
  display: "flex",
  position: "relative",
  left: "40%",
  borderRadius: "10px",
  backgroundImage:
    "url('https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const LeftBox = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "65%",
  backgroundColor: "#3B0764",
  borderRadius: "10px",
  //padding:'10px'
  //margin: "10px",
  display: "flex",
  position: "relative",
  left: "-3%",
}));

export const LocationDescriptionBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "60%",
  margin: "5px",
  //backgroundColor: "white",
  //alignItems: "center",
  display: "flex",
  position: "relative",
  justifyContent: "left",
  padding: "0px 0px 0px 20px",
  fontSize: "18px",
  fontWeight: "bold",
}));


export const DateDescriptionBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "60%",
  margin: "5px",
  //backgroundColor: "white",
  //alignItems: "center",
  display: "flex",
  position: "relative",
  justifyContent: "left",
  padding: "0px 0px 0px 20px",
  fontSize: "18px",
  fontWeight: "bold",
}));

export const TimeDescriptionBox = styled(Box)(({ theme }) => ({
   width: "100%",
  height: "60%",
  margin: "5px",
  //backgroundColor: "white",
  //alignItems: "center",
  display: "flex",
  position: "relative",
  justifyContent: "left",
  padding: "0px 0px 0px 20px",
  fontSize: "18px",
  fontWeight: "bold",
}));
export const YearDescriptionBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "60%",
  margin: "5px",
  // backgroundColor: "white",
  //alignItems: "center",
  display: "flex",
  position: "relative",
  justifyContent: "left",
  padding: "0px 0px 0px 20px",
  fontSize: "18px",
  fontWeight: "bold",
}));
export const NoOfArtistDescriptionBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "60%",
  margin: "5px",
  //backgroundColor: "white",
  //alignItems: "center",
  display: "flex",
  position: "relative",
  justifyContent: "left",
  padding: "0px 0px 0px 20px",
  fontSize: "18px",
  fontWeight: "bold",
}));

export const RightBox = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "65%",
  backgroundColor: "#6B21A8",
  borderRadius: "10px",
  //padding:'10px'
  //margin: "10px",
  display: "flex",
  position: "relative",
  left: "13%",
}));
