"use client";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Event } from "@/app/constants/models";
import { getEventById } from "@/app/services/EventServices";
import { useAppSelector } from "@/lib/hooks";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PaidIcon from "@mui/icons-material/Paid";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { Artist } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import styled from "@mui/system/styled";
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: theme.palette.primary.main, // Change to darker shade if needed
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-row": {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiCheckbox-root": {
    color: `${theme.palette.primary.main} !important`,
  },
  "& .MuiDataGrid-toolbarContainer": {
    "& .MuiButton-text": {
      color: theme.palette.primary.main,
    },
  },
}));

function switchStatus(status: string) {
  switch (status) {
    case "public":
      return <Chip color="success" icon={<PublicIcon />} label="Public" />;
    case "private":
      return <Chip color="secondary" icon={<LockIcon />} label="Private" />;
    default:
      return <Chip icon={<LockIcon />} label="Private" />;
  }
}

const ArtistSingleEventPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [filter, setFilter] = useState("event_id");
  const { event_id } = useParams();

  const [artists, setArtists] = useState<Artist[]>([]);
  const [singleEvent, setSingleEvent] = useState<Event[]>([]);

  useEffect(() => {
    getEventById(event_id as string).then((events) => {
      console.log("Event.....", events);
      setSingleEvent(events.data);
    });

    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const sessionColumns: GridColDef[] = [
    { field: "session_id", headerName: "ID", flex: 0.5 },
    { field: "session_name", headerName: "Session Name", flex: 1 },
    { field: "session_date", headerName: "Date", flex: 1 },
    { field: "session_time", headerName: "Time", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "venue", headerName: "Venue", flex: 1 },
    {
      field: "artists",
      headerName: "Artists",
      width: 200,
    },
    {
      field: "session_special_notice",
      headerName: "Special Notice",
      width: 250,
    },
  ];

  const teamColumns: GridColDef[] = [
    { field: "team_type", headerName: "Type", flex: 1 },
    { field: "team_name", headerName: "Name", flex: 1 },
    { field: "contact", headerName: "Contact", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  const sponsorColumns: GridColDef[] = [
    { field: "sponsor_type", headerName: "Type", flex: 1 },
    { field: "sponsor_name", headerName: "Name", flex: 1 },
    { field: "sponsor_contact", headerName: "Contact", flex: 1 },
    { field: "sponsor_email", headerName: "Email", flex: 1 },
  ];

  const artist = useAppSelector((state) => state.artist.user);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh", padding: 4 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            marginBottom: 2,
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
            Basic Event Details
          </Typography>
        </Box>
        <Divider></Divider>
        <Box sx={{ padding: "2em" }}>
          {singleEvent.map((event) => (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%", display: "flex", marginBottom: 2 }}>
                <Box
                  sx={{
                    width: "50%",
                    padding: 2,
                    display: "flex",
                    // justifyContent: "center",
                  }}
                >
                  <CardMedia
                    image={event.event_img}
                    sx={{ width: 250, height: 250, borderRadius: 2 }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="h6">Event Name</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="subtitle1">
                        {event.event_name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="h6">Event Type</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="subtitle1">
                        {event.event_type}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="h6">Age Limits</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="subtitle1">
                        {event.age_from} - {event.age_to}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="h6">No. of Sessions</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="subtitle1">
                        {event.sessions?.length}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="h6">Status</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="subtitle1">
                        {switchStatus(event.event_status)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="h6">Created At</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="subtitle1">
                        {event.createdAt.substring(0, 10)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="h6">Updated At</Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="subtitle1">
                        {event.updatedAt.substring(0, 10)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ width: "100%", marginBottom: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                    marginBottom: 2,
                  }}
                >
                  Event Sessions
                </Typography>

                <Divider sx={{ marginBottom: 2 }}></Divider>

                <StyledDataGrid
                  rows={event.sessions || []}
                  columns={sessionColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.session_id}
                />
              </Box>

              <Box sx={{ width: "100%", marginBottom: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                    marginBottom: 2,
                  }}
                >
                  Teams
                </Typography>

                <Divider sx={{ marginBottom: 2 }}></Divider>

                <StyledDataGrid
                  rows={
                    event.teams.map((team, index) => ({
                      ...team,
                      id: `${team.team_name}-${index}`,
                    })) || []
                  }
                  columns={teamColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.id}
                />
              </Box>

              <Box sx={{ width: "100%", marginBottom: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                    marginBottom: 2,
                  }}
                >
                  Sponsors
                </Typography>

                <Divider sx={{ marginBottom: 2 }}></Divider>

                <StyledDataGrid
                  rows={
                    event.sponsor.map((sponsor, index) => ({
                      ...sponsor,
                      id: `${sponsor.sponsor_name}-${index}`,
                    })) || []
                  }
                  columns={sponsorColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.id}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            marginBottom: 2,
            padding: 4,
            justifyContent: "end",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={()=>{router.push(`/artist/events`)}} startIcon={<ArrowBackIcon />} variant="contained" color="secondary" sx={{backgroundColor: "secondary"}}>
              Back
            </Button>
            <Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    router.push(`/artist/events/editEvent/${event_id}`);
                  }}
                  variant="outlined"
                  color="secondary"
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<LocalActivityIcon />}
                  onClick={() => {router.push(`/artist/events/tickets/${event_id}`)}}
                >
                  Tickets
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<PaidIcon />}
                  onClick={() => {router.push(`/artist/events/budget/${event_id}`)}}
                >
                  Budget
                </Button>
              </Stack>
            </Box>
          </div>
        </Box>
      </Card>
    </Grid>
  );
};

export default ArtistSingleEventPage;
