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
import React, { useEffect, useState } from "react";
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
import { Event } from "@/app/constants/models";

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

function EventDataGrid() {
  
  const eventData = [
    {
      event_id: '1',
      event_name: 'Music Festival',
      event_type: 'Concert',
      age_from: 18,
      age_to: 50,
      no_of_sessions: 3,
      event_status: 'Active',
      event_created_by: 'Admin'
    },
    // Add more event objects as needed
  ];

  const [rows, setRows] = useState(eventData);

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
    setRows((prevRows) => prevRows.filter((row) => row.event_id !== id));
    alert(`Delete event with ID: ${id}`);
  };

  const columns = [
    { field: 'event_id', headerName: 'ID', width: 50 },
    { field: 'event_name', headerName: 'Name', width: 100 },
    { field: 'event_type', headerName: 'Type', width: 100 },
    { field: 'age_from', headerName: 'Age From', type: 'number', width: 50 },
    { field: 'age_to', headerName: 'Age To', type: 'number', width: 50 },
    { field: 'no_of_sessions', headerName: 'Sessions', type: 'number', width: 50 },
    { field: 'event_status', headerName: 'Status', width: 90 },
    { field: 'event_created_by', headerName: 'Created By', width: 90 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <ActionsMenu
          id={params.id}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
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
