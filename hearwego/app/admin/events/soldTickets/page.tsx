"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  duration,
  useTheme,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { IoIosPause, IoIosPlay, IoMdMore } from "react-icons/io";
import { MdAlbum, MdDelete } from "react-icons/md";
import { GiSoundWaves } from "react-icons/gi";
import KeyIcon from "@mui/icons-material/Key";
import BlockIcon from "@mui/icons-material/Block";
import {
  SongCard,
  SongCardButtonGroup,
  SongCardCoverArt,
  SongCardItem,
  SongCardPlayButton,
} from "@/app/styles/songCard.styles";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { bool } from "aws-sdk/clients/signer";
import { Song } from "@/app/constants/models";
import { useRouter } from "next/navigation";
import { getSongs, getSongsForArtist } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import { GridActionsCellItem, DataGrid, GridToolbar } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getEvents } from "@/app/services/EventServices";
import { getAllEvents } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import { render } from "react-dom";
import { getAllArtists } from "@/app/services/ArtistServices";
import { getEvent } from "@/app/services/EventServices";
import { Artist } from "@/app/constants/models";
import { updateEventByAdmin } from "@/app/services/EventServices";
import { getSoldTickets } from "@/app/services/EventServices";
import { SoldTickets } from "@/app/constants/models";
import { AutoTicket } from "@/app/constants/models";
import { getAllAutoTickets } from "@/app/services/EventServices";
import Link from "next/link";
// import router, { Router } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EventDataGrid() {
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);

  const [events, setEvents] = useState<Event[]>([]);
  const [soldTickets, setSoldTickets] = useState<SoldTickets[]>([]);
  const [autoTickets, setAutoTickets] = useState<AutoTicket[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [eventId, setEventId] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getSoldTickets().then((soldTickets) => {
      console.log("Sold Tickets......", soldTickets);
      setSoldTickets(soldTickets.data);
    });
  }, []);

  useEffect(() => {
    getAllAutoTickets().then((autoTickets) => {
      console.log("Auto Tickets......", autoTickets);
      setAutoTickets(autoTickets.data);
    });
  }, []);

  useEffect(() => {
    getAllEvents().then((events) => {
      console.log("Events......", events);
      setEvents(events.data);
    });
  }, []);

  const getEventName = (ticket_id) => {
    const event = events.find(
      (event) => event.event_id === getGetEventId(ticket_id)
    );
    return event ? event.event_name : "Unknown";
  };

  const getGetEventId = (ticket_id) => {
    const autoTicket = autoTickets.find(
      (autoTicket) => autoTicket._id === ticket_id
    );
    return autoTicket ? autoTicket.event_id : "Unknown";
  };

  //   useEffect(() => {
  //     getAllEvents().then((events) => {
  //       console.log("Events......",events);
  //       setEvents(events.data);
  //     });

  //     getAllArtists().then((artists) => {
  //       console.log("Artists......",artists);
  //       setArtists(artists.data);
  //     });
  //   }
  //   , [isChanged]);

  //   const handleStatusUpdate = (event_id: string, eventStatus: string) => {

  //     let status = eventStatus;
  //     if (eventStatus !== "blocked"){
  //       status = "blocked";
  //     }
  //     else{
  //       status = "private";
  //     }

  //     updateEventByAdmin(event_id, {event_status: status}).then((response) => {
  //       console.log("Event Status Updated......",response);
  //       setIsChanged(!isChanged);

  //       // setEvents(events.data);
  //     }
  //     );
  //   };

  function createTicketData(
    _id: string,
    sold_ticket_id: string,
    ticket_id: string,
    user_id: string,
    bought_quantity: number,
    total_price: number,
    user_name: string,
    user_email: string,
    user_contact: string,
    order_ticket_id: string,
    createdAt: string,
    updatedAt: string
  ) {
    return {
      _id,
      sold_ticket_id,
      ticket_id,
      user_id,
      bought_quantity,
      total_price,
      user_name,
      user_email,
      user_contact,
      order_ticket_id,
      createdAt,
      updatedAt,
    };
  }

  const ticketRows = soldTickets.map((event) =>
    createTicketData(
      event._id,
      event.sold_ticket_id,
      event.ticket_id,
      event.user_id,
      event.bought_quantity,
      event.total_price,
      event.user_name,
      event.user_email,
      event.user_contact,
      event.order_ticket_id,
      event.createdAt,
      event.updatedAt
    )
  );

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "sold_ticket_id", headerName: "Sold ID", flex: 1 },
    { field: "ticket_id", headerName: "Ticket ID", flex: 2 },
    {
      field: "event_id",
      headerName: "Event ID",
      flex: 1,
      valueGetter: (params) => getGetEventId(params.row.ticket_id),
    },
    {
      field: "event_name",
      headerName: "Event",
      flex: 1,
      valueGetter: (params) => getEventName(params.row.ticket_id),
    },
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "bought_quantity", headerName: "Count", flex: 1 },
    { field: "total_price", headerName: "Total", flex: 1 },
    { field: "user_name", headerName: "User Name", flex: 1 },
    { field: "user_email", headerName: "E-mail", flex: 1 },
    { field: "user_contact", headerName: "Contact", flex: 1 },
    { field: "order_ticket_id", headerName: "Order ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
  ];

  const handleView = (id) => {
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    // Logic to edit an event
    alert(`Edit event with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete an event
    setEvents((prevRows) => prevRows.filter((row) => row.event_id !== id));
    alert(`Delete event with ID: ${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={ticketRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row.order_ticket_id} // Specify the custom id field
      />
    </div>
  );
}

const AdminUserPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          >
            Tickets Sold
          </Typography>
          <Button
            variant="contained"
            startIcon={<IoAddOutline />}
            sx={{
              textTransform: "capitalize",
              background: "#000",
              color: "#fff",
            }}
            onClick={() => {}}
            disabled
          >
            Add New Event
          </Button>
        </Box>
        <ADTabBox>
          <EventDataGrid />
        </ADTabBox>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2em 0",
          }}
        ></Box>
      </Card>
    </Grid>
  );
};

export default AdminUserPage;
