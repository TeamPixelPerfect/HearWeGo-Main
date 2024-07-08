"use client";

import Box from "@mui/material/Box";
import { Button, IconButton, Stack } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircleFilled";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ro } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface Props {
  //index: number;
  songImg: string;
  songName: string;
  noOfFollowers: number;
  song_id: string;
}

export default function SingleAlbum({
  //index,
  song_id,
  songImg,
  songName,
  noOfFollowers,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const router = useRouter();

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        margin: "1em auto",
        width: "90%",
        //height: "10%",
        backgroundColor: "primary.light",
        //display: "flex",
        border: "1px solid black",
        borderRadius: "10px",
      }}
    >
      <Stack direction="row" width="100%">
        <Box
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
        </Box>
        <Box
          sx={{
            backgroundImage: `url(${songImg})`,
            minWidth: "90px",
            minHeight: "90px",
            width: "10%",
            aspectRatio: "1/1",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            margin: "10px",
          }}
        ></Box>

        <Box
          sx={{
            position: "relative",
            width: "70%",
            //height: "100%",
            padding: "2em 3em 1em 1em",
            justifyContent: "space-between",
            alignItems: "center",
            //backgroundColor: "blue",
          }}
        >
          <Stack direction="column" width="100%">
            <Box
              sx={{
                position: "relative",
                display: "flex",
                fontSize: "20px",
                fontFamily: "Roboto",
                fontWeight: "bold",
                color: "primary.default",
                textAlign: "center",
                //backgroundColor:'yellow'
              }}
            >
              {songName}
            </Box>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: "bold",
                color: "primary.default",
                textAlign: "center",
                //backgroundColor:'red'
              }}
            >
              {noOfFollowers ? noOfFollowers : "0"}
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "30%",
            //height: "100%",
            padding: "2em 3em 1em 1em",
            alignItems: "center",
            //backgroundColor: "YELLOW",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              width: "50%",
              top: "10%",
              left: "50%",
              //backgroundColor:'RED'
            }}
          >
            {isPlaying ? (
              <PauseCircleIcon
                sx={{
                  fontSize: "40px",
                  color: "primary.main",
                }}
                onClick={togglePlay}
              />
            ) : (
              <PlayCircleIcon
                sx={{
                  fontSize: "40px",
                  color: "primary.main",
                }}
                onClick={togglePlay}
              />
            )}
          </Box>
        </Box>

        <IconButton
          onClick={() => {
            router.push(`/main/songs/${song_id}`);
          }}
          size="small"
          sx={{
            position: "relative",
            display: "flex",
            right: "5%",
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
