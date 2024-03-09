"use client";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SingleEvent from "@/app/components/SingleEvent";

import {
  Maindiv,
  CoverCardMedia,
  CaptionBox,
  Caption01Box,
  Caption02Box,
  Caption03Box,
  SearchPaper,
} from "@/app/styles/eventsMW.styles";
import { CustomSelect } from "@/app/components/eventsDropDown";

const eventNames = [
  {
    name: "Beats",
   img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
   date: "Jan 12",
    day: "Wednesday",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },

]

export const TypeOptions = [
  { value: "concerts", label: "Concerts" },
  { value: "festivals", label: "Festivals" },
  { value: "nightClubs", label: "Night Clubs" },
  { value: "other", label: "Other" },
 
];

export const LocationOptions = [
  { value: "none", label: "None" },
  { value: "singer", label: "Singer" },
  { value: "guitarist", label: "Guitarist" },
  { value: "drummer", label: "Drummer" },
  { value: "pianist", label: "Pianist" },
  { value: "bassist", label: "Bassist" },
];

export const ArtistOptions = [
  { value: "none", label: "None" },
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

  return (
    <Maindiv>
      <CoverCardMedia image="https://hwgbucket.s3.ap-south-1.amazonaws.com/images/_9b375a93-861d-4808-be51-555278ec9e21.jpeg">
        <div
          style={{
            background: "black",
            height: "500px",
            width: "100%",
            opacity: "0.8",
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
          //backgroundColor: "blue",
          //padding: "20px",
        }}
      >
        <Box
          style={{
            width: "50%",
            display: "flex",
            padding: "15px",
            marginLeft: "40px",
            //backgroundColor: "red",
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

        <Box
          sx={{
            width: "50%",
            //backgroundColor: "red",
            //position: "relative",
            display: "flex",
            padding: "15px",
            marginLeft: "40px",
            //justifyContent: "right",
            //alignItems:'right',
            //padding: "15px",
            //margin:'15px 40px 15px 0px',
          }}
        >
          <Stack direction="row" spacing={2}>
            <CustomSelect
              labelId="genre-select-label"
              id="genre-select"
              value={Type}
              onChange={handleTypeChange}
              label="Type"
              options={TypeOptions}
              placeholder="Type"
            />
            <CustomSelect
              labelId="profession-select-label"
              id="profession-select"
              value={Location}
              onChange={handleLocationChange}
              label="Location"
              options={LocationOptions}
              placeholder="Location"
            />
            <CustomSelect
              labelId="gender-select-label"
              id="gender-select"
              value={Artist}
              onChange={handleArtistChange}
              label="Artist"
              options={ArtistOptions}
              placeholder="Artist"
            />
          </Stack>
        </Box>
      </Box>
      <Divider sx={{
        width: "90%",
        height: "2px",
        // size: "50px",
        margin: "auto",
       backgroundColor: "primary.default",
      
      }}>

      </Divider>
      <Box
        style={{
          padding: "10px 0px 0px 60px",
          color: "primary.default",
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        My Interest
      </Box>

      <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
        {eventNames.map(({ name,img,date,day,time,artist }) => (
          <Grid item xs={4} md={2} style={{ paddingLeft: 0 }}>
            <SingleEvent
              eventName={name}
              eventImg={img}
              eventDate={date}
              eventDay={day}
              eventTime={time}
              artistName={artist}
              
            ></SingleEvent>
          </Grid>
        ))}
      </Grid>
      
    </Maindiv>
  );
}
