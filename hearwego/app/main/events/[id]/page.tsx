"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CardActions from "@mui/material/CardActions";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaClock } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";
import SpatialTrackingIcon from '@mui/icons-material/SpatialTracking';
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";

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
  OptionBox,
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

      <Box
        sx={{
          width: "100%",
          height: "400px",
          display: "flex",
          position: "relative",
          flexDirection: "row",
          //backgroundColor: "yellow",
          alignItems: "center",
          padding: "10px",
          //margin: "10px",
        }}
      >
        <Box
          sx={{
            width: "20%",
            height: "90%",
            //backgroundColor: "red",
            padding: "10px",
            //margin: "10px",
            display: "flex",
            position: "relative",
            left: "40%",
            borderRadius: "10px",
            backgroundImage:
              "url('https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>

        <Box
          sx={{
            width: "25%",
            height: "65%",
            backgroundColor: "#3B0764",
            borderRadius: "10px",
            //padding:'10px'
            //margin: "10px",
            display: "flex",
            position: "relative",
            left: "-3%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "95%",
              //backgroundColor: "yellow",
              display: "flex",
              position: "relative",
              flexDirection: "column",
              // justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0px 0px 40px",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "20%",
                margin: "0px",
                //backgroundColor: "black",
                //alignItems: "center",
                display: "flex",
                position: "relative",
                justifyContent: "left",
                //padding: "20px 0px 0px 50px",
              }}
            >
              <IoLocationSharp style={{ color: "white", fontSize: "35px" }} />

              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  margin: "5px",
                  //backgroundColor: "white",
                  //alignItems: "center",
                  display: "flex",
                  position: "relative",
                  justifyContent: "left",
                  padding: "0px 0px 0px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                XYZ Hall
              </Box>
            </Box>
            <Box
              sx={{
                width: "90%",
                height: "20%",
                margin: "0px",
                //backgroundColor: "blue",
                //alignItems: "center",
                display: "flex",
                position: "relative",
                justifyContent: "left",
                //padding: "20px 0px 0px 50px",
              }}
            >
              <SlCalender style={{ color: "white", fontSize: "35px" }} />

              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  margin: "5px",
                  //backgroundColor: "white",
                  //alignItems: "center",
                  display: "flex",
                  position: "relative",
                  justifyContent: "left",
                  padding: "0px 0px 0px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                2024-01-19
              </Box>
            </Box>
            <Box
              sx={{
                width: "90%",
                height: "20%",
                margin: "0px",
                //backgroundColor: "black",
                //alignItems: "center",
                display: "flex",
                position: "relative",
                justifyContent: "left",
                //padding: "20px 0px 0px 50px",
              }}
            >
              <FaClock style={{ color: "white", fontSize: "30px" }} />

              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  margin: "5px",
                  //backgroundColor: "white",
                  //alignItems: "center",
                  display: "flex",
                  position: "relative",
                  justifyContent: "left",
                  padding: "0px 0px 0px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                8.00 - 11.00.P.M
              </Box>
            </Box>
            <Box
              sx={{
                width: "90%",
                height: "20%",
                margin: "0px",
                //backgroundColor: "black",
                //alignItems: "center",
                display: "flex",
                position: "relative",
                justifyContent: "left",
                //padding: "20px 0px 0px 50px",
              }}
            >
              <BsPersonStanding style={{ color: "white", fontSize: "35px" }} />

              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  margin: "5px",
                 // backgroundColor: "white",
                  //alignItems: "center",
                  display: "flex",
                  position: "relative",
                  justifyContent: "left",
                  padding: "0px 0px 0px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                18 years above
              </Box>
            </Box>
            <Box
              sx={{
                width: "90%",
                height: "20%",
                margin: "0px",
                //backgroundColor: "black",
                //alignItems: "center",
                display: "flex",
                position: "relative",
                justifyContent: "left",
                //padding: "20px 0px 0px 50px",
              }}
            >
              <SpatialTrackingIcon style={{ color: "white", fontSize: "35px" }} />

              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  margin: "5px",
                  //backgroundColor: "white",
                  //alignItems: "center",
                  display: "flex",
                  position: "relative",
                  justifyContent: "left",
                  padding: "0px 0px 0px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                -
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "25%",
            height: "65%",
            backgroundColor: "#6B21A8",
            borderRadius: "10px",
            //padding:'10px'
            //margin: "10px",
            display: "flex",
            position: "relative",
            left: "13%",
          }}
        ></Box>
      </Box>
    </Maindiv>
  );
}
