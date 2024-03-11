"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";

interface Props {
  eventName: string;
  artistName: string;
}

const SingleEventDetails = [
  {
    eventName: "Beats",
    artistName: "Kaizer Kaize",
  },
];

import {
  Maindiv,
  CoverEventCardMedia,
  EventBox,
  EventNameBox,
  ArtistNameBox,
  OptionBox,
} from "../../../styles/eventsMW.styles";

export default function SingleEvent({ eventName, artistName }: Props) {
  return (
    <Maindiv>
      <CoverEventCardMedia image="https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ">
        <div
          style={{
            background: "black",
            height: "500px",
            width: "100%",
            opacity: "0.7",
          }}
        ></div>

        <EventBox>
          <EventNameBox>Beats</EventNameBox>
          <ArtistNameBox>Kaizer Kaize</ArtistNameBox>
        </EventBox>

        <OptionBox>
          <Stack direction="row" width="100%" spacing={"1px"}>
            <Button>
              <ShareIcon style={{ color: "white", fontSize: "35px" }} />
            </Button>
            <Button>
              <FavoriteBorderIcon
                style={{ color: "white", fontSize: "35px" }}
              />
            </Button>
            <CardActions style={{ justifyContent: "right" }}>
              <Button
                sx={{
                  borderRadius: "40px",
                  width: "100%",
                }}
                href="/main/artists/SingleArtistPage/MoreAlbums"
                variant="contained"
                //size="small"
              >
                Find Tickets
              </Button>
            </CardActions>
          </Stack>
        </OptionBox>
      </CoverEventCardMedia>

      <Stack direction="row" spacing={2}>
      <Box
      //elevation={0}
      sx={{
        overflow: "initial",
        maxWidth: 304,
        width:'600px',
        height:'500px',
        backgroundColor: "blue",
      }}
    >
      <Box
       
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
          backgroundColor: "red",
        }}
      />

      </Box>
      </Stack>
    </Maindiv>
  );

}
