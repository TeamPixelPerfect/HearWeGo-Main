"use client";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  Maindiv,
  CoverCardMedia,
  CaptionBox,
  Caption01Box,
  Caption02Box,
  Caption03Box,
} from "@/app/styles/eventsMW.styles";

export default function EventsPage() {
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
    </Maindiv>
  );
}
