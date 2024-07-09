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
import Link from "next/link";
import { ro } from "date-fns/locale";
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
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [eventId, setEventId] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllEvents().then((events) => {
      console.log("Events......", events);
      setEvents(events.data);
    });

    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, [isChanged]);

  const handleStatusUpdate = (event_id: string, eventStatus: string) => {
    let status = eventStatus;
    if (eventStatus !== "blocked") {
      status = "blocked";
    } else {
      status = "private";
    }

    updateEventByAdmin(event_id, { event_status: status }).then((response) => {
      console.log("Event Status Updated......", response);
      setIsChanged(!isChanged);

      // setEvents(events.data);
    });
  };

  function createEventData(
    event_id: string,
    event_img: string,
    event_name: string,
    event_type: string,
    age_from: number,
    age_to: number,
    sessions: any,
    event_status: string,
    event_created_by: string,
    createdAt: string,
    updatedAt: string
  ) {
    return {
      event_id,
      event_img,
      event_name,
      event_type,
      age_from,
      age_to,
      no_of_sessions: sessions.length,
      sessions,
      event_status,
      event_created_by,
      createdAt,
      updatedAt,
    };
  }

  const eventRows = events.map((event) =>
    createEventData(
      event.event_id,
      event.event_img,
      event.event_name,
      event.event_type,
      event.age_from,
      event.age_to,
      event.sessions,
      event.event_status,
      event.event_created_by,
      event.createdAt,
      event.updatedAt
    )
  );

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const columns = [
    { field: "event_id", headerName: "Event ID", flex: 1 },
    {
      field: "event_img",
      headerName: "Event Image",
      flex: 1,
      renderCell: (params) => (
        <img src={params.row.event_img} style={{ width: 50, height: 50 }} />
      ),
    },
    { field: "event_name", headerName: "Event Name", flex: 2 },
    { field: "event_type", headerName: "Event Type", flex: 1 },
    { field: "age_from", headerName: "Age From", flex: 1 },
    { field: "age_to", headerName: "Age To", flex: 1 },
    { field: "no_of_sessions", headerName: "No of Sessions", flex: 1 },
    {
      field: "event_status",
      headerName: "Event Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.row.event_status;
        let chipColor;
        switch (status) {
          case "private":
            chipColor = "primary";
            break;
          case "public":
            chipColor = "success";
            break;
          case "blocked":
            chipColor = "error";
            break;
          default:
            chipColor = "default";
        }
        return (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={chipColor}
          />
        );
      },
    },
    { field: "event_created_by", headerName: "Artist ID", flex: 1 },
    {
      field: "ArtistName",
      headerName: "Artist Name",
      flex: 2,
      valueGetter: (params) => getArtistName(params.row.event_created_by),
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <ButtonGroup>
          {/* <Link href={`/app/admin/events/${params.row.event_id}`}> */}
          <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => {
              router.push(`/admin/events/${params.row.event_id}`);
            }}
          >
            <FaEye />
          </IconButton>
          {/* </Link> */}
          <IconButton
            disabled={
              params.row.event_status == "public" ||
              params.row.event_status == "private"
            }
            color="success"
            sx={{ fontSize: "16px" }}
            onClick={() =>
              handleStatusUpdate(params.row.event_id, params.row.event_status)
            }
          >
            <KeyIcon />
          </IconButton>
          <IconButton
            disabled={params.row.event_status == "blocked"}
            color="error"
            sx={{ fontSize: "16px" }}
            onClick={() =>
              handleStatusUpdate(params.row.event_id, params.row.event_status)
            }
          >
            <BlockIcon />
          </IconButton>
        </ButtonGroup>
      ),
    },
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
        rows={eventRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row.event_id} // Specify the custom id field
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
            Events
          </Typography>
          <Stack direction="row" spacing={2}>
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
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
              }}
              onClick={() => {
                router.push(`/admin/events/soldTickets`);
              }}
              // disabled
            >
              Tickets Sold
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
              }}
              onClick={() => {
                router.push(`/admin/events/autoTickets`);
              }}
              // disabled
            >
              Generated Tickets
            </Button>
          </Stack>
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
