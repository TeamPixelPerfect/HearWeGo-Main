"use client";
// src/StyledComponents.ts

import { styled } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


export const Search = styled("div")(({ theme }) => ({
  p: "20px",
  display: "flex",
  alignItems: "center",
  width: "60%",
  backgroundColor: theme.palette.background.default,
  borderRadius: "90px",
  border: "2px solid #E6ECF0",
  height: "40px",
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
  padding: '10px',
  marginBottom: '1em',
}));

export const ProductContainer = styled("div")(({ theme }) => ({
  maxWidth: '600px',
  margin: '0 auto',
  padding: theme.spacing(2),
}));

export const ProductImageContainer = styled("div")(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& img': {
    maxWidth: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
    margin: theme.spacing(1),
  },
}));

export const CommentsContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
}));




export const RootContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

export const ImagesContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const Image = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  maxHeight: 400,
}));

export const DetailsContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const CommentSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const CommentForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
