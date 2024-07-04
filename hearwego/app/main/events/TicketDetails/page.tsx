import React from "react";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import SingleEventComponent from "../../../components/SingleEvent";

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

const recommendEvents = [
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },

]

export default function Tickets({ params: { id } }: Props) {
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
                href="/main/events/BuyTickets"
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

      <Box
        style={{
          padding: "20px",
          width: "100%",
          //backgroundColor: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          //alignItems: "center",
        }}
      >
        <TableContainer
          sx={{
            width: "30%",
            margin: "50px 0px 0px 80px",
            height: "30%",
            border: "1px solid black",
            alignItems: "center",
            borderRadius: "16px",
          }}
          component={Paper}
        >
          <Table
            sx={{
              width: "100%",
              height: "100%",
              //backgroundColor:'blue'
              alignItems: "center",
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#3B0764",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    color: "white",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  Ticket Type
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    color: "white",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                backgroundColor: "primary.light",
                //alignItems:'center',
              }}
            >
              <TableRow sx={{}}>
                <TableCell sx={{ fontSize: "16px" }}>Gold</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>2500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: "16px" }}>Silver</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>2000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontSize: "16px" }}>Bronze</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>1000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            backgroundColor: "#6B21A8",
            width: "40%",
            //height: "500px",
            padding: "20px",
            borderRadius: "15px",
            margin: "0px 90px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              fontSize: "20px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {" "}
            Special Notice :
          </Box>
          <Box
            sx={{
              fontSize: "16px",
              //color: "white",
              padding: "20px",
              display: "flex",
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Dui porttitor eu id
            venenatis blandit lorem egestas. At adipiscing orci pulvinar sodales
            arcu. Ultricies et enim molestie felis amet facilisi nullam nunc
            consectetur. Sapien viverra magna a nunc aliquam odio :
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#6B21A8",
            width: "75%",
            height: "250px",
            padding: "20px",
            borderRadius: "15px",
            margin: "20px 0px 0px 0px",
            position: "relative",

        
          }}
        >
          <Box
            sx={{
              fontSize: "20px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {" "}
            Description :
          </Box>
          <Box
            sx={{
              fontSize: "16px",
              //color: "white",
              padding: "20px",
              display: "flex",
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Dui porttitor eu id
            venenatis blandit lorem egestas. At adipiscing orci pulvinar sodales
            arcu. Ultricies et enim molestie felis amet facilisi nullam nunc
            consectetur. Sapien viverra magna a nunc aliquam odio :
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          //alignItems: "right",
          //backgroundColor: "blue",
          //padding: "20px",
        }}
      >
        <Box
          style={{
            padding: "10px 0px 0px 60px",
            color: "primary.default",
            fontSize: "32px",
            fontWeight: "bold",
            //backgroundColor: "yellow",
          }}
        >
          Recommend by Artist
        </Box>
        <CardActions style={{ padding: "20px" }}>
          <Button
            href="/main/events/MoreInterestEvents"
            //variant="contained"
            size="small"
          >
            Show All
          </Button>
        </CardActions>
      </Box>

      <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
        {recommendEvents.map(
          ({ name, img, date, day, time, artist, event_id }) => (
            <Grid item xs={4} md={2} style={{ paddingLeft: 30 }}>
              <SingleEventComponent
                eventID={event_id}
                eventName={name}
                eventImg={img}
                eventDate={date}
                eventDay={day}
                eventTime={time}
                artistName={artist}
              ></SingleEventComponent>
            </Grid>
          )
        )}
      </Grid>
    </Maindiv>
  );
}
