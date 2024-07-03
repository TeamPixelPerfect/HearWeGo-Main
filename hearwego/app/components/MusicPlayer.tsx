"use client";

import { useAppSelector } from "@/lib/hooks";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPlayer = () => {
  const theme = useTheme();

  const playerRef = useRef();

  const song = useAppSelector((state) => state.song);

  const pauseAudio = () => {
    playerRef.current.audio.current.pause();
  };

  const playAudio = () => {
    playerRef.current.audio.current.play();
  };

  useEffect(() => {
    if (song?.playing) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [song?.playing]);

  return (
    <Box
      sx={{
        width: "86%",
        height: "100px",
        background: theme.palette.mode === "dark" ? "#0f0f0f" : "#ccc",
        position: "fixed",
        bottom: 0,
        padding: "0.5em",
        // border:
        //   theme.palette.mode === "light"
        //     ? "1px solid rgba(0, 0, 0, 0.12)"
        //     : "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Box>
        <Stack
          direction="row"
          sx={{ alignItems: "center", padding: "0 1em" }}
          spacing={2}
        >
          <Box>
            <img
              src={
                song?.cover_art ||
                "https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg"
              }
              alt={song?.song_name}
              style={{ width: "60px", height: "60px", borderRadius: "10px" }}
            />
          </Box>
          <Box sx={{ width: "20%" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "16px", fontWeight: "700" }}
            >
              {song?.song_name}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "14px" }}>
              {song?.artist}
            </Typography>
          </Box>
          <AudioPlayer
            ref={playerRef}
            style={{
              width: "100%",
              background: theme.palette.mode === "dark" ? "#0f0f0f" : "#ccc",
              border: "none",
              boxShadow: "none",
            }}
            autoPlay={song?.playing}
            src={song?.current_song}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
