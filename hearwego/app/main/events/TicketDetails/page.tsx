import React from 'react'
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";


interface Props {
    params: { id: string };
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
    OptionBox

  } from "../../../styles/eventsMW.styles";

export default function SingleEvent({ params: { id } }: Props) {
    console.log("Event_id::", id);
    return (
      <Maindiv>
        <CoverEventCardMedia image="https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png">
          <div
            style={{
              background: "black",
              height: "400px",
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
            <CardActions style={{ justifyContent: "right" }}>
              <Button
                sx={{
                  borderRadius: "40px",
                  width: "100%",
                  left: "80%",
                }}
                href="/main/events/TicketDetails"
                variant="contained"
                //size="small"
              >
                Buy Ticket
              </Button>
            </CardActions>
          </Stack>
        </OptionBox>
          </CoverEventCardMedia>
          <Box
          style={{
            padding: "40px 0px 0px 80px",
            color: "primary.default",
            fontSize: "32px",
            fontWeight: "bold",
            //backgroundColor: "yellow",
          }}
        >
          Ticket Details
        </Box>
          </Maindiv>
    );
}