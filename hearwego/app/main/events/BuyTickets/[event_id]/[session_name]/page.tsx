"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TicketCover } from "../../../../../styles/BuyTickets.styles";
import { Maindiv } from "../../../../../styles/SingleArtistPage.styles";
import { useParams } from "next/navigation";
import { Event } from "@/app/constants/models";
import { SoldTickets } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getEvent } from "@/app/services/EventServices";
import { getAllArtists } from "@/app/services/ArtistServices";
import {
  getAutoTicketsByEventAndSession,
  getAllRemainingTickets,
  updateRemainingTicketByTicketId,
  createSoldTicket,
  getTicketTypeByEventId,
} from "@/app/services/EventServices";
import { TicketType } from "@/app/constants/models";
import { AutoTicket, Artist, RemainingTickets } from "@/app/constants/models";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Alert from "@mui/material/Alert";
import PaymentIcon from "@mui/icons-material/Payment";
import Modal from "@mui/material/Modal";
import { Snackbar } from "@mui/material";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import QRCode from "qrcode.react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import EventCheckout from "@/app/components/EventCheckout";

const ticketModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const paymentModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

interface CartTickets {
  ticket_id: string;
  ticket_type: string;
  ticket_price: number;
  ticket_count: number;
}

const QRCodeComponent = ({ value }) => {
  return (
    <div>
      <QRCode value={value} />
    </div>
  );
};

function SingleTicket(
  ticket_id: string,
  ticket_type: string,
  event_name: string,
  session_name: string,
  session_date: string,
  session_time: string,
  session_venue: string,
  ticket_price: number,
  ticket_img: string,
  ticket_count: number
) {
  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        border: "1px #000 solid",
        marginBottom: 2,
      }}
    >
      <Box sx={{ width: "25%" }}>
        <CardMedia
          component="img"
          sx={{ width: "200px", height: "200px" }}
          image={ticket_img}
        />
      </Box>
      <Box sx={{ width: "35%" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "16px", marginBottom: 2, marginTop: 2 }}
        >
          Ticket ID: {ticket_id}
        </Typography>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              Ticket Count: {ticket_count}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              Ticket Type: {ticket_type}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              Event: {event_name}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              Session: {session_name}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              Date: {session_date}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              Time: {session_time}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              Venue: {session_venue}
            </Typography>

            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontSize: "24px" }}
            >
              LKR {ticket_price}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QRCodeComponent
          value={JSON.stringify({
            ticketId: ticket_id,
            ticketType: ticket_type,
            eventName: event_name,
            sessionName: session_name,
            sessionDate: session_date,
          })}
        />
      </Box>
    </Paper>
  );
}

export default function Page() {
  const { event_id, session_name } = useParams();
  const boxRef = useRef();
  const [openTicketModal, setOpenTicketModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpenTicketModal = () => setOpenTicketModal(true);
  const handleCloseTicketModal = () => setOpenTicketModal(false);
  const user = useAppSelector((state) => state.user.user);
  const [event, setEvent] = useState<Event | null>(null);
  const [ticketType, setTicketType] = useState<TicketType | null>(null);
  const [soldTicket, setSoldTicket] = useState<SoldTickets | null>({
    ticket_id: "",
    user_id: "",
    bought_quantity: 0,
    total_price: 0,
    user_name: "",
    user_email: "",
    user_contact: "",
    user_nic: "",
  });
  const [autoTickets, setAutoTickets] = useState<AutoTicket[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [remainingTickets, setRemainingTickets] = useState<RemainingTickets[]>(
    []
  );
  const [tempRemainingTickets, setTempRemainingTickets] = useState<
    RemainingTickets[]
  >([]);
  const [cartTickets, setCartTickets] = useState<CartTickets[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const amount = 200;

  const handleSuccessClose = () => {
    setSuccessMessage("");
    setOpenTicketModal(true); // Close modal on success
  };

  const handleErrorClose = () => {
    setErrorMessage("");
  };

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
    getAutoTicketsByEventAndSession(
      event_id as string,
      session_name as string
    ).then((autoTickets) => {
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

  useEffect(() => {
    getTicketTypeByEventId(event_id as string).then((ticketType) => {
      setTicketType(ticketType);
    });
  }, [event_id]);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const getTicketRemainCountTemp = (ticketId) => {
    const remainingTicket = tempRemainingTickets.find(
      (remainingTicket) => remainingTicket.ticket_id === ticketId
    );
    return remainingTicket ? remainingTicket.remaining_quantity : 0;
  };

  const handleUpdateRemainingTickets = () => {
    for (let i = 0; i < tempRemainingTickets.length; i++) {
      updateRemainingTicketByTicketId(
        user.token,
        tempRemainingTickets[i].ticket_id as string,
        { remaining_quantity: tempRemainingTickets[i].remaining_quantity }
      );
    }
  };

  const handleOpenCheckout = () => {
    setCheckoutOpen(true); // Open Checkout component
  };

  const handleCreateSoldTicket = () => {
    for (let i = 0; i < cartTickets.length; i++) {
      createSoldTicket(user.token, {
        ticket_id: cartTickets[i].ticket_id,
        user_id: user?.user_id,
        bought_quantity: cartTickets[i].ticket_count,
        total_price: cartTickets[i].ticket_price,
        user_name: user?.name,
        user_email: user?.email,
        user_contact: user?.mobileNumber,
        user_nic: "",
      });
    }
  };

  const handleTicketClick = (autoTicket) => {
    setTempRemainingTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.ticket_id === autoTicket._id
          ? {
              ...ticket,
              remaining_quantity: (ticket.remaining_quantity as number) - 1,
            }
          : ticket
      )
    );

    setCartTickets((prevCartTickets) => {
      const existingCartTicket = prevCartTickets.find(
        (ticket) => ticket.ticket_id === autoTicket._id
      );
      if (existingCartTicket) {
        return prevCartTickets.map((ticket) =>
          ticket.ticket_id === autoTicket._id
            ? {
                ...ticket,
                ticket_count: ticket.ticket_count + 1,
                ticket_price: ticket.ticket_price + autoTicket.ticket_price,
              }
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
                ticket_price:
                  cartTicket.ticket_price -
                  cartTicket.ticket_price / cartTicket.ticket_count,
              }
            : cartTicket
        )
      );
    } else {
      setCartTickets((prevCartTickets) =>
        prevCartTickets.filter(
          (cartTicket) => cartTicket.ticket_id !== ticket.ticket_id
        )
      );
    }

    setTempRemainingTickets((prevTickets) =>
      prevTickets.map((tempTicket) =>
        tempTicket.ticket_id === ticket.ticket_id
          ? {
              ...tempTicket,
              remaining_quantity: tempTicket.remaining_quantity + 1,
            }
          : tempTicket
      )
    );
  };

  const downloadPDF = () => {
    const input = boxRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // Specify dimensions for the PDF
      const pdf = new jsPDF({
        orientation: "landscape", // 'portrait' or 'landscape'
        unit: "mm", // 'mm', 'pt', 'cm', 'in'
        format: "a3", // 'a3', 'a4', 'a5', 'letter', 'legal', or custom [width, height]
      });

      // Calculate width and height to fit the page
      const imgWidth = 500; // A4 width in mm
      const pageHeight = 500; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    });
  };

  return (
    <Maindiv>
      <TicketCover
        event_name={event?.event_name}
        artist_name={getArtistName(event?.event_created_by)}
        img={event?.event_img}
      />
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
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
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                startIcon={<AddCircleIcon />}
                onClick={() => handleTicketClick(autoTicket)}
              >
                <Typography variant="h5">{autoTicket.ticket_type}</Typography>
                <Typography variant="subtitle1" fontStyle="italic">
                  ( {getTicketRemainCountTemp(autoTicket._id)} Remaining )
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  LKR {autoTicket.ticket_price}
                </Typography>
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
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => handleCartTicketClick(ticket)}
              >
                <Typography variant="h6">{ticket.ticket_type}</Typography>
                <Typography variant="h6">
                  Count: {ticket.ticket_count}
                </Typography>
                <Typography variant="h6">
                  Total: LKR {ticket.ticket_price}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          p: 5,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          Total:
          <Typography
            variant="h4"
            color="secondary"
            sx={{ fontWeight: 600, fontSize: "1.5em", marginLeft: 3 }}
          >
            LKR{" "}
            {cartTickets.reduce((acc, ticket) => acc + ticket.ticket_price, 0)}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
          endIcon={<PaymentIcon />}
          onClick={() => {
            // handleUpdateRemainingTickets();
            // handleCreateSoldTicket();
            // handlePaymentGateway();
          }}
        >
          Proceed to Payment
        </Button>
      </Box>

      <Button onClick={handleOpenTicketModal}>Click</Button>
      <Button onClick={handleOpenCheckout} variant="contained" color="primary">
        Open Checkout
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openTicketModal}
        onClose={handleCloseTicketModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openTicketModal}>
          <Box sx={ticketModalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Your Tickets
            </Typography>
            <Box sx={{ width: "100%", height: "75vh" }}>
              <Box
                ref={boxRef}
                id="tickets"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "scroll",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  "-ms-overflow-style": "none", // IE and Edge
                  "scrollbar-width": "none",
                }}
              >
                {cartTickets.map((ticket) => {
                  const autoTicket = autoTickets.find(
                    (autoTicket) => autoTicket._id === ticket.ticket_id
                  );
                  return autoTicket
                    ? SingleTicket(
                        autoTicket._id,
                        autoTicket?.ticket_type,
                        event?.event_name as string,
                        session_name as string,
                        event?.sessions[
                          (session_name.match(/\d+/)[0] - 1) as number
                        ].session_date.slice(0, 10) as string,
                        event?.sessions[
                          (session_name.match(/\d+/)[0] - 1) as number
                        ].session_time as string,
                        event?.sessions[
                          (session_name.match(/\d+/)[0] - 1) as number
                        ].venue as string,
                        ticket.ticket_price,
                        (ticketType?.ticket_img as string) ||
                          "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/defaultEvent.jpeg ",
                        ticket.ticket_count
                      )
                    : null;
                })}
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Button variant="contained" color="primary" onClick={downloadPDF}>
                Download PDF
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={checkoutOpen}
        onClose={handleCloseTicketModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={checkoutOpen}>
          <Box sx={paymentModalStyle}>
            <EventCheckout
              amount={amount as number}
              setPaymentStatus={setPaymentStatus}
            />
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Maindiv>
  );
}
