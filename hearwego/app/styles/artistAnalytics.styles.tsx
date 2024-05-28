import { Box, Card, styled } from "@mui/material";

export const ADAnalyticBox = styled(Card)(({ theme }) => ({
  padding: "2em 1.5em",
//   boxShadow: theme.palette.mode === "light" ? "3px 3px 8px rgba(0,0,0,0.1)" : "3px 3px 8px rgba(0,0,0,0.5)",
  borderRadius: "10px",
}));
