//Songs Mor Page

"use client";
import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SingleSongRow from "@/app/components/SingleSongRow";
import { Stack } from "@mui/material";
import {
  Maindiv,
  SearchPaper,
} from "../../../../styles/SingleArtistPage.styles";

const songNames = [
  {
    index: 7,
    songImg: "https://i1.sndcdn.com/artworks-000003321270-60t2ec-t500x500.jpg",
    songName: "Billy Jean",
    noOfFollowers: "1,234,450,000",
  },
  {
    index: 8,
    songImg: "https://miro.medium.com/v2/resize:fit:500/0*U2KdecQg1CLUbMZc.jpg",
    songName: "Beat It",
    noOfFollowers: "2,234,450,800",
  },
  {
    index: 9,
    songImg:
      "https://i1.sndcdn.com/artworks-1OHOA4uZkbc36Prf-ht3dkw-t500x500.jpg",
    songName: "Smooth Criminal",
    noOfFollowers: "1,034,450,090",
  },
  {
    index: 10,
    songImg:
      "https://upload.wikimedia.org/wikipedia/en/3/3e/Earth_Song_cover.jpg",
    songName: "Earth Song",
    noOfFollowers: "4,234,989,000",
  },
  {
    index: 11,
    songImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGwiHncfzBj2eBDZJ2huqgU27ESCyRXgf4wA&usqp=CAU",
    songName: "You Are Not Alone",
    noOfFollowers: "3,234,490,600",
  },
  {
    index: 12,
    songImg: "https://i.ytimg.com/vi/B87SGx0OADY/maxresdefault.jpg",
    songName: "Billy Jean",
    noOfFollowers: "1,234,450,000",
  },
];

export default function MoreSongs() {
  return (
    <Maindiv>
      {/* This Search bar is used to search the songs */}
      <Box
        style={{
          display: "flex",
          padding: "15px",
        }}
      >
        <SearchPaper>
          <InputBase
            sx={{ ml: 5, flex: 1 }}
            placeholder="Michael J"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
            <SearchIcon />
          </IconButton>
            
        </SearchPaper>
      </Box>
      <Box
        style={{
          padding: "0px 0px 0px 20px",
          color: "prmary.default",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Songs
      </Box>

      {/* This is the grid for songs */}
      <Stack>
        {songNames.map(({ index, songImg, songName, noOfFollowers }) => (
          <SingleSongRow
            index={index}
            songImg={songImg}
            songName={songName}
            noOfFollowers={noOfFollowers}
          ></SingleSongRow>
        ))}
      </Stack>
    </Maindiv>
  );
}
