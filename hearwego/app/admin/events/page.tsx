"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Tab,
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getEvents } from "@/app/services/EventServices";
import { getAllEvents } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import { render } from "react-dom";

function ActionsMenu({ id, handleView, handleEdit, handleDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleView(id); handleClose(); }}>View</MenuItem>
        <MenuItem onClick={() => { handleEdit(id); handleClose(); }}>Edit</MenuItem>
        <MenuItem onClick={() => { handleDelete(id); handleClose(); }}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

let i = 1;

function EventDataGrid() {

  const artist = useAppSelector((state) => state.artist.user);

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getAllEvents().then((events) => {
      console.log("Events......",events);
      setEvents(events.data);
    });
    // console.log("Events......",events);
  }
  , []);

  function createEventData(
    event_id: string,
    event_img: string,
    event_name: string,
    event_type: string,
    age_from: number,
    age_to: number,
    no_of_sessions: number,
    sessions: any,
    sponsor: any,
    teams: any,
    event_status: string,
    event_created_by: string,
    createdAt: string,
    updatedAt: string
  ){return { event_id, event_img, event_name, event_type, age_from, age_to, no_of_sessions, sessions, sponsor, teams, event_status, event_created_by, createdAt, updatedAt };}

  const eventRows = events.map((event) => 
    createEventData(
      event.event_id,
      event.event_img,
      event.event_name,
      event.event_type,
      event.age_from,
      event.age_to,
      event.no_of_sessions,
      event.sessions,
      event.sponsor,
      event.teams,
      event.event_status,
      event.event_created_by,
      event.createdAt,
      event.updatedAt
    )
  );

  const columns = [
    { field: "event_id", headerName: "Event ID", flex: 1 },
    { field: "event_img", headerName: "Event Image", flex: 1, renderCell: (params) => (<img src={params.row.event_img} style={{ width: 50, height: 50 }} />)},
    { field: "event_name", headerName: "Event Name", flex: 2 },
    { field: "event_type", headerName: "Event Type", flex: 1 },
    { field: "age_from", headerName: "Age From", flex: 1 },
    { field: "age_to", headerName: "Age To", flex: 1 },
    { field: "no_of_sessions", headerName: "No of Sessions", flex: 1, renderCell: (params) => (<span>{params.row.sessions.length}</span>)},
    { field: "sessions", headerName: "Sessions", flex: 2 },
    { field: "sponsor", headerName: "Sponsor", flex: 2 },
    { field: "teams", headerName: "Teams", flex: 2 },
    { field: "event_status", headerName: "Event Status", flex: 1 },
    { field: "event_created_by", headerName: "Created By", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <ButtonGroup>
          <IconButton color="primary" sx={{ fontSize: "16px" }}>
            <FaEdit />
          </IconButton>
          <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => {
              // router.push(`/admin/events/${params.row.event_id}`);
            }}
          >
            <FaEye />
          </IconButton>
          <IconButton color="error" sx={{ fontSize: "16px" }}>
            <MdDelete />
          </IconButton>
        </ButtonGroup>
      ),
    },
  ];


  const handleView = (id) => {
    // Logic to view an event
    alert(`View event with ID: ${id}`);
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

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={eventRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row.event_id}  // Specify the custom id field
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
          <Button
            variant="contained"
            startIcon={<IoAddOutline />}
            sx={{
              textTransform: "capitalize",
              background: "#000",
              color: "#fff",
            }}
            onClick={() => {}}
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
        >
          
        </Box>
      </Card>
    </Grid>
  );
};

export default AdminUserPage;
