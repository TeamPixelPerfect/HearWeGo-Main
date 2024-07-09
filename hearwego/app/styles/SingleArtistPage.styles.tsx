"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

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
  "@media (max-width: 960px)": {
    height: "1000px",
  },
}));
export const AllMiddleBox = styled(Box)(({ theme }) => ({
  //backgroundColor: "red",
  position: "absolute",
  top: "35%",
  left: "8%",
  width: "90%",
  height: "60%",
  display: "flex",
  "@media (max-width: 960px)": {
    top: "10%",
  },
  //flexDirection: "column",
}));

export const ProfilePicAvatar = styled(Avatar)(({ theme }) => ({
  width: "180px",
  height: "180px",
  border: "1px solid white",
  position: "relative",
  display: "flex",
}));

export const ArtistDetailBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "60%",
  height: "100%",
  padding: "2em 3em 1em 3em",
  justifyContent: "space-between",
  "@media (max-width: 960px)": {
    width: "100%",
    flexDirection: "column",
    padding: 0,
  },
  //backgroundColor:'blue'
}));

export const ArtistNameBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  fontSize: "32px",
  fontFamily: "Roboto",
  fontWeight: "bold",
  color: "white",
  textAlign: "center",
  //backgroundColor:'yellow'
}));
export const FlagBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    "url(https://miro.medium.com/v2/resize:fit:1358/0*o0-6o1W1DKmI5LbX.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "35px",
  height: "20px",
  position: "relative",
  display: "flex",
  margin: "15px",
  //top: "10px",
}));

export const GenreBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  fontSize: "20px",
  fontFamily: "Roboto",
  fontWeight: "semi-bol",
  color: "Blue",
  textAlign: "center",
  textTransform: "capitalize",
  //backgroundColor:'red'
}));

export const SocialMediaBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  textAlign: "center",
  padding: "4px 0",
  "@media (max-width: 960px)": {
    padding: "1em 0",
  },

  //backgroundColor:'red'
}));

export const OptionBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "20%",
  top: "30%",
  left: "80%",
  "@media (max-width: 960px)": {
    width: "100%",
    top: "90%",
    left: "0%",
  },
  //backgroundColor:'red',
}));

export const SearchPaper = styled(Paper)(({ theme }) => ({
  component: "form",
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "40%",
  backgroundColor: theme.palette.background.default,
  borderRadius: "90px",
  height: "50px",
  position: "relative",
}));

//Tabal
export const TableContainer = styled("table")({
  padding: "10px",
  //backgroundColor: "red",
  width: "50%",
  // height: "70%",
  display: "flex",
  //borderRadius:'20px'
  "@media (max-width: 960px)": {
    width: "100%",
  },
});

export const TableRow = styled("tr")({});

export const TableCell = styled("td")(({ theme }) => ({
  padding: "8px",
  textAlign: "left",
  fontSize: "16px",
  fontWeight: "bold",

  "&:nth-child(odd)": {
    backgroundColor: "#4338CA",
    //borderRight:'none',
    color: "white",
  },
  "&:nth-child(even)": {
    backgroundColor: theme.palette.background.default,
    width: "70%",
    borderLeft: "none",
  },
}));

export const RightBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  width: "50%",
  padding: "1em",
  marginLeft: "0em",
  margin: "10px",
  "@media (max-width: 960px)": {
    width: "100%",
  },
}));
