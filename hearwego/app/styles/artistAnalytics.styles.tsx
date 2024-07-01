import { Box, Card, styled } from "@mui/material";

export const ADAnalyticBox = styled(Card)(({ theme }) => ({
  padding: "2em 1.5em",
  //   boxShadow: theme.palette.mode === "light" ? "3px 3px 8px rgba(0,0,0,0.1)" : "3px 3px 8px rgba(0,0,0,0.5)",
  borderRadius: "10px",
  height: "100%",
}));

export const ADGraphTab = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
  width: "100%",
  padding: "8px",
  borderLeft: `3px solid ${theme.palette.primary.main}`,
  background: active ? theme.palette.primary.dark : theme.palette.primary.light,
  "&:hover": {
    // color: theme.palette.primary.main,
    background: "#C4B5FD",
  },
}));
