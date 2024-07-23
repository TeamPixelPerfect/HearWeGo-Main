"use client";
import React, { useState ,useEffect} from "react";
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
  Slide,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { getArtist, getArtistV2 } from "@/app/services/ArtistServices";
import { useAppSelector } from "@/lib/hooks";
import { getUpcomingEventsForGivenArtist } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import {useRouter} from "next/navigation";

const events = [
  {
    title: "Event One",
    date: "June 20, 2024",
    image: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
    description:
      "Description for event one. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non justo non ante pulvinar ultricies sed nec urna.",
    location: "Location One",
    tickets:
      "Tickets available at $20 per person. Purchase at the venue or online.",
    sponsors: ["Sponsor One", "Sponsor Two"],
    ticketLink: "https://example.com/event-one-tickets",
  },
  {
    title: "Event Two",
    date: "July 15, 2024",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFYDy0dtqY-GmpwssQR-DKlQgrvsRy47FokQ&s",
    description:
      "Description for event two. Sed imperdiet odio a leo ultricies, vel pretium felis lobortis. Fusce rhoncus convallis ex, in varius ex tincidunt non.",
    location: "Location Two",
    tickets:
      "Tickets available at $30 per person. Purchase at the venue or online.",
    sponsors: ["Sponsor Three", "Sponsor Four"],
    ticketLink: "https://example.com/event-two-tickets",
  },
  {
    title: "Event Three",
    date: "August 10, 2024",
    image: "https://content.jdmagicbox.com/comp/ernakulam/m4/0484px484.x484.140206113128.a9m4/catalogue/we-create-events-panampilly-nagar-ernakulam-event-management-companies-nsobpzm660.jpg",
    description:
      "Description for event three. Donec nec nunc nec purus ultricies tincidunt. Nullam non justo non ante pulvinar ultricies sed nec urna.",
    location: "Location Three",
    tickets:
      "Tickets available at $25 per person. Purchase at the venue or online.",
    sponsors: ["Sponsor Five", "Sponsor Six"],
    ticketLink: "https://example.com/event-three-tickets",
  }
  // Add more events as needed
];

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f7f7f7",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "2.5rem",
      marginBottom: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.4,
    },
  },
});

interface Props {
  artist_id: string;
}
const App = ({ artist_id }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [artist, setArtist] = useState<any>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.token) {
      getUpcomingEventsForGivenArtist( 1,10,artist_id as string)
        .then((events) => {
          console.log("Club events: ", events);
          setEvents(events.data);
        })
        .catch((error) => console.log(error));
    }

    getArtistV2(artist_id).then((res) => {
      setArtist(res.user);
    });
  }, [artist_id, user?.token]);

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Upcoming Events
          </Typography>
        </Grid>
        {artist &&
          events.map((Event, index) => {
            return (
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
                      <EventIcon fontSize="small" /> {new Date(Event.sessions?.[0]?.session_date ?? "").toLocaleDateString()}
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
                        router.push(`/main/events/ ${Event.event_id}`);
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
          );
        })}
        </Grid>

        
      </Container>
    </ThemeProvider>
  );
};

export default App;
