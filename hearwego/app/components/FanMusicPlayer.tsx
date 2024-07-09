"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { pauseSong } from "@/lib/features/song.slice";

const FanMusicPlayer = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:960px)");

  const playerRef = useRef();

  const dispatch = useAppDispatch();
  const song = useAppSelector((state) => state.song);
  const [hide, setHide] = useState(false);

  const pauseAudio = () => {
    playerRef.current.audio.current.pause();
  };

  const playAudio = () => {
    playerRef.current.audio.current.play();
  };

  const closePlayer = () => {
    setHide(true);
  };

  useEffect(() => {
    if (song?.playing) {
      playAudio();
      setHide(false);
    } else {
      pauseAudio();
    }
  }, [song?.playing]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        background: theme.palette.mode === "dark" ? "#0f0f0f" : "#ccc",
        position: "fixed",
        bottom: 0,
        padding: "0.5em",
        display: song?.current_song && !hide ? "block" : "none",

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
          <Stack
            direction="row"
            sx={{ width: matches ? "40%" : "25%", alignItems: "center" }}
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
            <Box>
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
          </Stack>
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
            onPause={() => {
              dispatch(pauseSong());
            }}
          />
          <IconButton onClick={closePlayer}>
            <ExpandMoreIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default FanMusicPlayer;
