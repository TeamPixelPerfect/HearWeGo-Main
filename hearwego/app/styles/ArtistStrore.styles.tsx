"use client";
// src/StyledComponents.ts

import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export const Search = styled("div")(({ theme }) => ({
  // p: "8px 4px",
  display: "flex",
  alignItems: "center",
  minWidth: "300px",
  width: "40%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "10px",
  // border: "2px solid #E6ECF0",
  // height: "40px",
  position: "relative",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
}));

export const WhiteArea = styled(Stack)(({ theme }) => ({
  
}));

