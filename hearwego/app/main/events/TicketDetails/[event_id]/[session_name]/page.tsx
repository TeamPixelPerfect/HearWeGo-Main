"use client";
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
import { Divider, Grid, Typography } from "@mui/material";
import SingleEventComponent from "../../../../../components/SingleEvent";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Event } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getEvent } from "@/app/services/EventServices";
import { Artist } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import { getTicketTypeByEventId } from "@/app/services/EventServices";
import { TicketType } from "@/app/constants/models";
import { getAutoTicketsByEventAndSession } from "@/app/services/EventServices";
import { AutoTicket } from "@/app/constants/models";
import { getManualTicketsByEventAndSession } from "@/app/services/EventServices";
import { ManualTicket } from "@/app/constants/models";
import { getUpcomingEventsForGivenArtistByFan } from "@/app/services/EventServices";

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
} from "../../../../../styles/eventsMW.styles";

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
];

export default function Tickets() {
  const router = useRouter();
  const { event_id, session_name } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const [event, setEvent] = React.useState<Event | null>(null);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [ticketTypes, setTicketTypes] = React.useState<TicketType>();
  const [autoTickets, setAutoTickets] = React.useState<AutoTicket[]>([]);
  const [manualTickets, setManualTickets] = React.useState<ManualTicket[]>([]);
  const [artistEvents, setArtistEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    getTicketTypeByEventId(event_id as string).then((ticketTypes) => {
      setTicketTypes(ticketTypes);
    });
  }, [event_id, session_name]);

  React.useEffect(() => {
    if (ticketTypes?.ticket_type === "Auto") {
      getAutoTicketsByEventAndSession(
        event_id as string,
        session_name as string
      ).then((autoTickets) => {
        setAutoTickets(autoTickets);
      });
    }
    if (ticketTypes?.ticket_type === "Manual") {
      getManualTicketsByEventAndSession(
        event_id as string,
        session_name as string
      ).then((manualTickets) => {
        setManualTickets(manualTickets);
      });
    }
  }, [event_id, session_name, ticketTypes]);

  React.useEffect(() => {
    getEvent(event_id as string).then((event) => {
      setEvent(event);
    });
  }, [event_id]);

  React.useEffect(() => {
    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  React.useEffect(() => {
    if (event) {
      getUpcomingEventsForGivenArtistByFan(1, 4, event.event_created_by).then(
        (events) => {
          setArtistEvents(events.data);
        }
      );
    }
  }, [event, user]);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  function formatSessionName(session) {
    const match = session.match(/session(\d+)/i);
    if (!match) return session;

    let number = parseInt(match[1], 10);
    let formattedNumber = number < 10 ? `0${number}` : `${number}`;

    return `Session ${formattedNumber}`;
  }
  // console.log("Event_id::", id);
  return (
    <Maindiv>
      <CoverEventCardMedia image={event?.event_img}>
        <div
          style={{
            background: "black",
            height: "400px",
            width: "100%",
            opacity: "0.7",
          }}
        ></div>

        <EventBox>
          <EventNameBox sx={{ alignItems: "center" }}>
            {event?.event_name}
            <Typography
              variant="subtitle1"
              style={{
                color: "#898b8c",
                fontSize: "28px",
                marginLeft: 10,
                fontStyle: "italic",
              }}
            >
              {" "}
              - {formatSessionName(session_name)}
            </Typography>
          </EventNameBox>
          <ArtistNameBox>
            {getArtistName(event?.event_created_by)}
          </ArtistNameBox>
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
                disabled={ticketTypes?.ticket_type !== "Auto"}
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
        {ticketTypes?.ticket_type === "Auto" ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              pr: 20,
              pl: 10,
              alignItems: "center",
            }}
          >
            <TableContainer
              sx={{
                width: "50%",
                // margin: "50px 0px 0px 80px",
                // height: "30%",
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
                  {autoTickets.map(({ ticket_type, ticket_price }) => (
                    <TableRow>
                      <TableCell sx={{ fontSize: "16px" }}>
                        {ticket_type}
                      </TableCell>
                      <TableCell sx={{ fontSize: "16px" }}>
                        {ticket_price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Paper
              sx={{
                width: "45%",
                height: "250px",
                p: 5,
                bgcolor: "primary.main",
                borderRadius: "20px",
              }}
            >
              <Typography
                variant="subtitle2"
                color="#fff"
                sx={{ marginBottom: 1, fontSize: "1.5em" }}
              >
                Description
              </Typography>
              <Divider />
              <Typography
                variant="body1"
                sx={{ padding: "20px", marginTop: 1 }}
              >
                {ticketTypes?.ticket_description == "" ||
                ticketTypes?.ticket_description == "-"
                  ? "No Description Provided"
                  : ticketTypes?.ticket_description}
              </Typography>
            </Paper>
          </Box>
        ) : ticketTypes?.ticket_type === "Manual" ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              pr: 20,
              pl: 10,
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                width: "45%",
                p: 5,
                bgcolor: "primary.main",
                height: "250px",
                borderRadius: "20px",
              }}
            >
              <Typography
                variant="subtitle2"
                color="#fff"
                sx={{ marginBottom: 1, fontSize: "1.5em" }}
              >
                Where to buy Tickets ?
              </Typography>
              <Divider />
              {manualTickets.map(({ ticket_location }) => (
                <Typography sx={{marginTop: 1}}>{ticket_location}</Typography>
              ))}
            </Paper>

            <Paper
              sx={{
                width: "45%",
                height: "250px",
                p: 5,
                bgcolor: "primary.main",
                borderRadius: "20px",
              }}
            >
              <Typography
                variant="subtitle2"
                color="#fff"
                sx={{ marginBottom: 1, fontSize: "1.5em" }}
              >
                Description
              </Typography>
              <Divider />
              <Typography
                variant="body1"
                sx={{ padding: "20px", marginTop: 1 }}
              >
                {ticketTypes?.ticket_description == "" ||
                ticketTypes?.ticket_description == "-"
                  ? "No Description Provided"
                  : ticketTypes?.ticket_description}
              </Typography>
            </Paper>
          </Box>
        ) : <Typography>Not Provided</Typography>}
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
        {artistEvents.map(
          ({ event_id, event_name, event_img, sessions, event_created_by }) => (
            <Grid item xs={4} md={3} style={{ paddingLeft: 30 }}>
              <SingleEventComponent
                eventID={event_id}
                eventName={event_name}
                eventImg={event_img}
                artistName={getArtistName(event_created_by)}
                noOfSessions={sessions?.length}
              ></SingleEventComponent>
            </Grid>
          )
        )}
      </Grid>
    </Maindiv>
  );
}
