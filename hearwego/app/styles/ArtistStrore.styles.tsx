"use client";
// src/StyledComponents.ts

import { styled } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";
import Stack from '@mui/material/Stack';

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
