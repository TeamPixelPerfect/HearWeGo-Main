import { Box, Card, CardContent, CardMedia, TextField } from "@mui/material";
import styled from "styled-components";

import { useTheme } from "@emotion/react";
// Styled Components

export const OrderCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  color: "text.primary",
  height: "450px",
}));

export const OrderDetails = styled(CardContent)(() => ({
  flex: "1 0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

export const OrderMedia = styled(CardMedia)(() => ({
  width: "100%",
  height: 200,
  objectFit: "cover",
}));

export const OrderActions = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
  width: "100%",
  padding: "1em",
}));

export const SearchBar = styled(TextField)(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1em",
  color: "text.primary",
}));
