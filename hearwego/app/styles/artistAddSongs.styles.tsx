"use client";
import { styled } from "@mui/material";
import { Box } from "@mui/material";

export const SongPreviewSong = styled(Box)(({ theme }) => ({
    width: '20%',
    position: "relative",
    "@media (max-width:540px)": {
      width: "100%",
    }

  }));

export const SongPreviewDetails = styled(Box)(({ theme }) => ({
    width: '45%',
    paddingLeft: '1em',
    paddingTop: '10px',
  }));

  export const SongPreviewShare = styled(Box)(({ theme }) => ({
    width: '35%',
    display: 'flex',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'space-between',
    "@media (max-width:540px)": {
      width: "100%",
    }
  }));