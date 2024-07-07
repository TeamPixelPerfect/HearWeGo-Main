"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  TicketCover,
} from "../../../../../styles/BuyTickets.styles";
import { Maindiv } from "../../../../../styles/SingleArtistPage.styles";
import { useParams } from "next/navigation";
import { Event } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getEvent } from "@/app/services/EventServices";
import { getAllArtists } from "@/app/services/ArtistServices";
import { getAutoTicketsByEventAndSession, getAllRemainingTickets } from "@/app/services/EventServices";
import { AutoTicket, Artist, RemainingTickets } from "@/app/constants/models";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PaymentIcon from '@mui/icons-material/Payment';

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
  const [event, setEvent] = useState<Event | null>(null);
  const [autoTickets, setAutoTickets] = useState<AutoTicket[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [remainingTickets, setRemainingTickets] = useState<RemainingTickets[]>([]);
  const [tempRemainingTickets, setTempRemainingTickets] = useState<RemainingTickets[]>([]);
  const [cartTickets, setCartTickets] = useState<CartTickets[]>([]);

  useEffect(() => {
    getEvent(event_id as string).then((event) => {
      setEvent(event);
    });
  }, [event_id]);

  useEffect(() => {
    getAllArtists().then((artists) => {
      setArtists(artists.data);
    });
  }, []);

  useEffect(() => {
    getAutoTicketsByEventAndSession(event_id as string, session_name as string).then((autoTickets) => {
      console.log("Auto Tickets.... ", autoTickets);
      setAutoTickets(autoTickets);
    });
  }, [event_id, session_name]);

  useEffect(() => {
    getAllRemainingTickets().then((remainingTickets) => {
      setRemainingTickets(remainingTickets.data);
      setTempRemainingTickets(remainingTickets.data);
    });
  }, []);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const getTicketRemainCountTemp = (ticketId) => {
    const remainingTicket = tempRemainingTickets.find((remainingTicket) => remainingTicket.ticket_id === ticketId);
    return remainingTicket ? remainingTicket.remaining_quantity : 0;
  };

  const handleTicketClick = (autoTicket) => {
    setTempRemainingTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.ticket_id === autoTicket._id
          ? { ...ticket, remaining_quantity: ticket.remaining_quantity - 1 }
          : ticket
      )
    );

    setCartTickets((prevCartTickets) => {
      const existingCartTicket = prevCartTickets.find((ticket) => ticket.ticket_id === autoTicket._id);
      if (existingCartTicket) {
        return prevCartTickets.map((ticket) =>
          ticket.ticket_id === autoTicket._id
            ? { ...ticket, ticket_count: ticket.ticket_count + 1, ticket_price: ticket.ticket_price + autoTicket.ticket_price }
            : ticket
        );
      } else {
        return [
          ...prevCartTickets,
          {
            ticket_id: autoTicket._id,
            ticket_type: autoTicket.ticket_type,
            ticket_price: autoTicket.ticket_price,
            ticket_count: 1,
          },
        ];
      }
    });
  };

  const handleCartTicketClick = (ticket) => {
    if (ticket.ticket_count > 1) {
      setCartTickets((prevCartTickets) =>
        prevCartTickets.map((cartTicket) =>
          cartTicket.ticket_id === ticket.ticket_id
            ? {
                ...cartTicket,
                ticket_count: cartTicket.ticket_count - 1,
                ticket_price: cartTicket.ticket_price - (cartTicket.ticket_price / cartTicket.ticket_count),
              }
            : cartTicket
        )
      );
    } else {
      setCartTickets((prevCartTickets) =>
        prevCartTickets.filter((cartTicket) => cartTicket.ticket_id !== ticket.ticket_id)
      );
    }

    setTempRemainingTickets((prevTickets) =>
      prevTickets.map((tempTicket) =>
        tempTicket.ticket_id === ticket.ticket_id
          ? { ...tempTicket, remaining_quantity: tempTicket.remaining_quantity + 1 }
          : tempTicket
      )
    );
  };

  return (
    <Maindiv>
      <TicketCover
        event_name={event?.event_name}
        artist_name={getArtistName(event?.event_created_by)}
        img={event?.event_img}
      />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "45%", marginTop: "20px", p: 5 }}>
          <Typography variant="h4" gutterBottom>
            Tickets
          </Typography>
          <Stack spacing={2} sx={{ width: "100%", padding: "10px" }}>
            {autoTickets.map((autoTicket) => (
              <Button
                key={autoTicket.auto_ticket_id}
                disabled={getTicketRemainCountTemp(autoTicket._id) <= 0}
                variant="contained"
                sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
                startIcon={<AddCircleIcon />}
                onClick={() => handleTicketClick(autoTicket)}
              >
                <Typography variant="h5">{autoTicket.ticket_type}</Typography>
                <Typography variant="subtitle1" fontStyle="italic">( {getTicketRemainCountTemp(autoTicket._id)} Remaining )</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>LKR {autoTicket.ticket_price}</Typography>
              </Button>
            ))}
          </Stack>
        </Box>

        <Box sx={{ width: "45%", marginTop: "20px", p: 5 }}>
          <Typography variant="h4" gutterBottom>
            Cart Details
          </Typography>
          <Stack spacing={2} sx={{ width: "100%", padding: "10px" }}>
            {cartTickets.map((ticket) => (
              <Button
                startIcon={<RemoveCircleIcon />}
                variant="contained"
                color="error"
                key={ticket.ticket_id}
                sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
                onClick={() => handleCartTicketClick(ticket)}
              >
                <Typography variant="h6">{ticket.ticket_type}</Typography>
                <Typography variant="h6">Count: {ticket.ticket_count}</Typography>
                <Typography variant="h6">Total: LKR {ticket.ticket_price}</Typography>
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", p: 5 }}>
        <Typography variant="h4" gutterBottom sx={{display: "flex", alignItems: "center"}}>
          Total: 
          <Typography variant="h4" color="secondary" sx={{ fontWeight: 600, fontSize: "1.5em", marginLeft: 3 }}>
          LKR {cartTickets.reduce((acc, ticket) => acc + ticket.ticket_price, 0)}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
          endIcon={<PaymentIcon />}
        >
          Proceed to Payment
        </Button>
      </Box>
    </Maindiv>
  );
}
