"use client";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";



import {
  Maindiv,
  CoverCardMedia,
  CaptionBox,
  Caption01Box,
  Caption02Box,
  Caption03Box,
  SearchPaper,
  CustomSelect,
} from "@/app/styles/eventsMW.styles";

export const TypeOptions = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hiphop", label: "Hip Hop" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
];

export const LocationOptions = [
  { value: "singer", label: "Singer" },
  { value: "guitarist", label: "Guitarist" },
  { value: "drummer", label: "Drummer" },
  { value: "pianist", label: "Pianist" },
  { value: "bassist", label: "Bassist" },
];

export const ArtistOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];





export default function EventsPage() {
  const [Type, setType] = React.useState("");
  const [Location, setLocation] = React.useState("");
  const [Artist, setArtist] = React.useState("");

  

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLocation(event.target.value as string);
  };

  const handleArtistChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setArtist(event.target.value as string);
  };

  const [value, setValue] = React.useState(0);
  const handleScrollChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };
  return (
    <Maindiv>
      <CoverCardMedia image="https://hwgbucket.s3.ap-south-1.amazonaws.com/images/_9b375a93-861d-4808-be51-555278ec9e21.jpeg">
        <div
          style={{
            background: "black",
            height: "500px",
            width: "100%",
            opacity: "0.7",
          }}
        ></div>

        <CaptionBox>
          <Caption01Box>Book your Ticket</Caption01Box>
          <Box
            sx={{
              height: "100%",
              position: "relative",
              display: "flex",
              // backgroundColor: "blue",
            }}
          >
            <Caption02Box>for your Favorite Event </Caption02Box>
            <Caption03Box>Now</Caption03Box>
          </Box>
        </CaptionBox>
      </CoverCardMedia>

      
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: "center",
          backgroundColor: "blue",
          //padding: "20px",
        }}
      >
      <Box
        style={{
          width: "50%",
          display: "flex",
          padding: "15px",
          marginLeft: "40px",
          backgroundColor: "red",
         // justifyContent: "left",
        }}
      >
        <SearchPaper>
          <InputBase
            sx={{ ml: 5, flex: 1 }}
            placeholder="Search for Events"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10" }} aria-label="Search">
            <SearchIcon />
          </IconButton>
            
        </SearchPaper>
      </Box>

    <Box sx={{
      width: "50%",
      backgroundColor: "white",
      position: "relative",
      display: "flex",
      justifyContent: "right",
      //alignItems:'right',
      //padding: "15px",
      margin:'15px 40px 15px 0px',
    }}>
      <Stack direction="row" spacing={5}>
          <CustomSelect
            labelId="Type-select-label"
            id="Type-select"
            value={Type}
            onChange={handleTypeChange}
            label="Type"
            options={TypeOptions}
            placeholder="Type"
          />
          <CustomSelect
            labelId="Location-select-label"
            id="Location-select"
            value={Location}
            onChange={handleLocationChange}
            label="Location"
            options={LocationOptions}
            placeholder="Location"
          />
          <CustomSelect
            labelId="Artist-select-label"
            id="Artist-select"
            value={Artist}
            onChange={handleArtistChange}
            label="Artist"
            options={ArtistOptions}
            placeholder="Artist"
          />
          
          
        </Stack>
        </Box>
      </Box>
    </Maindiv>
  );
}
