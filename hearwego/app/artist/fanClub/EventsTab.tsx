"use client";
import React, { useState } from "react";
import { useEffect } from "react";  
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Grid,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Slide,
  useTheme,
} from "@mui/material";
import {useRouter} from "next/navigation";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { Event } from "@/app/constants/models";
import { getEventsByArtist } from "@/app/services/EventServices";
import { useAppSelector } from "@/lib/hooks";

const EventsTab = () => {

  const theme = useTheme();
  const artist = useAppSelector((state) => state.artist.user);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (artist?.token){
      getEventsByArtist(artist.token,artist?.user?.artist_id? artist.user.artist_id:"")
      .then((events) => {
        console.log("Events: ", events);
        setEvents(events.data);
      })

      .catch((error) => console.log(error));
    }
  },[]);

  const handleLearnMoreClick = (event: any) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Events
        </Typography>
        <Grid container spacing={3}>
          {events.map((Event, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Slide direction="up" in={true} timeout={index * 250}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={Event.event_img}
                    alt={Event.event_name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {Event.event_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <EventIcon fontSize="small" />   {new Date(Event.sessions?.[0]?.session_date ?? "").toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <LocationOnIcon fontSize="small" /> {Event.sessions?.[0]?.venue ?? ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {Event.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        router.push("/artist/events");
                      }}
                      startIcon={<InfoIcon />}
                      variant="contained"
                      color="primary"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>

        
      </Container>
    </ThemeProvider>
  );
};

export default EventsTab;
