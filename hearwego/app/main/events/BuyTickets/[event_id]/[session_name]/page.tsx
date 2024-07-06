"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  stepConnectorClasses,
} from "@mui/material";
import {
  PaymentDetails,
  SuccessfulDetails,
  TicketCover,
  Ticketdetails,
} from "../../../../../styles/BuyTickets.styles";
import { Maindiv } from "../../../../../styles/SingleArtistPage.styles";
import { styled } from "@mui/material/styles";
import { Step, StepLabel, Stepper, StepConnector } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import FeedIcon from "@mui/icons-material/Feed";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Check } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FillDetails } from "../../../../../styles/BuyTickets.styles";
import { useParams } from "next/navigation";
import { Event } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getEvent } from "@/app/services/EventServices";
import { Artist } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import { getAutoTicketsByEventAndSession } from "@/app/services/EventServices";
import { AutoTicket } from "@/app/constants/models";
import { getRemainingTicketByTicketId } from "@/app/services/EventServices";
import { getAllRemainingTickets } from "@/app/services/EventServices";
import { RemainingTickets } from "@/app/constants/models";

interface CartTickets {
  ticket_id: string;
  ticket_type: string;
  ticket_price: number;
  ticket_count: number;
}

const steps = ["Your Details", "Ticket Details", "Payment", "Successful"];

export default function Page() {
  const { event_id, session_name } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const [event, setEvent] = React.useState<Event | null>(null);
  const [autoTickets, setAutoTickets] = React.useState<AutoTicket[]>([]);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [remainingTickets, setRemainingTickets] = React.useState<RemainingTickets[]>([]);
  const [cartTickets, setCartTickets] = React.useState<CartTickets[]>([]);

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
    getAutoTicketsByEventAndSession(event_id as string, session_name as string).then((autoTickets) => {
      setAutoTickets(autoTickets);
    });
  }, [event_id, session_name]);

  React.useEffect(() => {
    getAllRemainingTickets().then((remainingTickets) => {
      setRemainingTickets(remainingTickets.data);
    });
  }, []);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const getTicketRemainCount = (ticketId) => {
    const remainingTicket = remainingTickets.find((remainingTicket) => remainingTicket.ticket_id === ticketId);
    return remainingTicket ? remainingTicket.remaining_quantity : 0;
  };

  return (
    <Maindiv>
      <TicketCover
        event_name={event?.event_name}
        artist_name={getArtistName(event?.event_created_by)}
        img={event?.event_img}
      />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "40%" }}>
          <Stack spacing={2} sx={{ width: "100%", padding: "10px" }}>
            {autoTickets.map((autoTicket) => (
              <Button disabled={(getTicketRemainCount(autoTicket.auto_ticket_id) as number <=0)} variant="contained" sx={{width: "100%", display: "flex", justifyContent: "space-between"}} startIcon={<AddCircleIcon />}>
                <Typography variant="h5">{autoTicket.ticket_type}</Typography>
                <Typography variant="h5">{getTicketRemainCount(autoTicket.auto_ticket_id)}</Typography>
                <Typography variant="h5" sx={{fontWeight: 600}}>LKR {autoTicket.ticket_price}</Typography>
              </Button>))}
          </Stack>
        </Box>


      </Box>
    </Maindiv>
  );
}

