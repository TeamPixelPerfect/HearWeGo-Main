"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

export const Maindiv = styled("div")(({ theme }) => ({
    backgroundColor:theme.palette.background.paper,
    width: '100%',
    height: '100vh',
}));

export const CoverCardMedia = styled(CardMedia)(({ theme }) => ({
     width: "100%",
    height: "500px",
    marginTop: "0px",
    //opacity: "0.5",
    position: "relative",
 }));

 export const ProfilePicAvatar = styled(Avatar)(({ theme }) => ({
    width: "170px",
    height: "170px",
    opacity: "1",
    border: "1px solid white",
    position: 'absolute',
     top: '60%',
    left: '15%',
    transform: 'translate(-50%, -50%)',
    
}));


  
 
   