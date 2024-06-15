"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic parameters
import {
  useTheme,
  Grid,
  Card,
  Box,
  Typography,
  Pagination,
  CardMedia,
  Divider,
} from "@mui/material";
import { getEvent } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getEvents } from "@/app/services/EventServices";
import { getEventById } from "@/app/services/EventServices";
import { getAllArtists } from "@/app/services/ArtistServices";
import { Artist } from "@/app/constants/models";

const AdminSingleEventPage = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState("event_id");
  const { id } = useParams(); 
  
  const [artists, setArtists] = useState<Artist[]>([]);
  const [singleEvent, setSingleEvent] = useState<Event[]>([]);

  useEffect(() => {
    getEventById(id as string).then((events) => {
      console.log("Event.....", events);
      setSingleEvent(events.data);
    });

    getAllArtists().then((artists) => {
      console.log("Artists......",artists);
      setArtists(artists.data);
    });
  }, []);

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.artistName : 'Unknown';
  };

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
            <Box sx={{ width: "100%", display: "flex" }}>
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
                      {event.event_status}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="h6">Created At</Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="subtitle1">
                      {event.createdAt}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="h6">Updated At</Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="subtitle1">
                      {event.updatedAt}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="h6">Created By</Typography>
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="subtitle1">
                      {event.event_created_by} - {getArtistName(event.event_created_by)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Card>
    </Grid>
  );
};

export default AdminSingleEventPage;
