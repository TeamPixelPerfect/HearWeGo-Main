"use client";

import Box from "@mui/material/Box";
import { Button, IconButton, Stack, useTheme } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircleFilled";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ro } from "date-fns/locale";
import { useRouter } from "next/navigation";
import useAudio from "../Hooks/useAudio";
import { useAppSelector } from "@/lib/hooks";
import { addSongPlay } from "../services/AnalyticServices";

interface Props {
  //index: number;
  songImg: string;
  songName: string;
  noOfFollowers: number;
  song_id: string;
  songUrl: string;
  artist: string;
}

export default function SingleSong({
  //index,
  song_id,
  songImg,
  songName,
  noOfFollowers,
  songUrl,
  artist,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const song = useAppSelector((state) => state.song);

  const { toggle, playing } = useAudio({
    url: songUrl,
    songName: songName,
    coverArt: songImg,
    artist: artist,
  });

  const theme = useTheme();

  const router = useRouter();

  const incrementPlayCount = () => {
    addSongPlay(song_id).then((res) => {
      // console.log(res);
    });
  };

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        margin: "1em auto",
        width: "90%",
        //height: "10%",
        backgroundColor: "black",
        //display: "flex",
        boxShadow: `0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)`,
        borderRadius: "10px",
      }}
    >
      <Stack
        direction="row"
        width="100%"
        sx={{ justifyContent: "space-between" }}
      >
        {/* <Box
          sx={{
            //backgroundColor:'white',
            //width: "10%",
            margin: "20px",
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            color: "primary.default",
          }}
        >
          *
        </Box> */}
        <Stack direction="row">
          <Box
            sx={{
              backgroundImage: `url(${songImg})`,
              minWidth: "100px",
              minHeight: "100px",
              aspectRatio: "1/1",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Box>

          <Box
            sx={{
              width: "70%",
              display: "flex",
              alignItems: "center",
              padding: "0 1.5em",
            }}
          >
            <Stack direction="column" width="100%">
              <Box
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {songName}
              </Box>
              <Box sx={{}}>{noOfFollowers ? noOfFollowers : "0"}</Box>
            </Stack>
          </Box>
        </Stack>

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            p: "0 1em",
          }}
        >
          <IconButton onClick={incrementPlayCount}>
            {song?.current_song === songUrl && song?.playing ? (
              <PauseCircleIcon
                sx={{
                  fontSize: "40px",
                  color: "primary.main",
                }}
                onClick={toggle}
              />
            ) : (
              <PlayCircleIcon
                sx={{
                  fontSize: "40px",
                  color: "primary.main",
                }}
                onClick={toggle}
              />
            )}
          </IconButton>

          <IconButton
            onClick={() => {
              router.push(`/main/songs/${song_id}`);
            }}
            size="small"
            sx={{}}
          >
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
