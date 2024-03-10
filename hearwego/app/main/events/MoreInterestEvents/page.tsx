import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleEvent from "@/app/components/SingleEvent";

import { Maindiv, SearchPaper } from "../../../styles/eventsMW.styles";

const interestEvents = [
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
    {
      name: "Beats",
      img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
      date: "Jan 12",
      day: "Wednesday",
      time: "8:00 PM",
      artist: "Kaizer Kaize",
    },
  ];


export default function MoreAlbums() {
  return (
    <Maindiv>
      <Box
        style={{
          display: "flex",
          padding: "15px",
        }}
      >
        <SearchPaper>
          <InputBase
            sx={{ ml: 5, flex: 1 }}
            placeholder="Search Events"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
            <SearchIcon />
          </IconButton>
            
        </SearchPaper>
      </Box>
      <Box
        style={{
          padding: "10px 0px 0px 60px",
          color: "primary.default",
          fontSize: "32px",
          fontWeight: "bold",
          //backgroundColor: "yellow",
        }}
      >
        Interest Events
      </Box>
      <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
        {interestEvents.map(({ name, img, date, day, time, artist }) => (
          <Grid item xs={4} md={2} style={{ paddingLeft: 30 }}>
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
