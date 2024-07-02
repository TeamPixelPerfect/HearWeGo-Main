"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "@/lib/hooks";
const SharedTab = () => {
  const artist = useAppSelector((state) => state.artist.user);
  return (
    <Typography variant="h6" gutterBottom>
      Already Shared Tab
    </Typography>
  );
};

export default SharedTab;
