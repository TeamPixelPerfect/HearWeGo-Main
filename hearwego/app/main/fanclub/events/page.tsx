"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

// Define the event data
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

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

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
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold"}}>
        Events
        </Typography>
        <Grid container spacing={3}>
          {events.map((event, index) => (
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
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <EventIcon fontSize="small" /> {event.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <LocationOnIcon fontSize="small" /> {event.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleLearnMoreClick(event)}
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

        <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
          <DialogTitle>
            {selectedEvent?.title}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>{selectedEvent?.description}</DialogContentText>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ mt: 2 }}
            >
              <EventIcon fontSize="small" /> {selectedEvent?.date}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ mt: 1 }}
            >
              <LocationOnIcon fontSize="small" /> {" "}
              {selectedEvent?.location}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ mt: 1 }}
            >
              {selectedEvent?.tickets}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ mt: 1 }}
            >
              Ticket Link:{" "}
              <a
                href={selectedEvent?.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.palette.primary.main }}
              >
                {selectedEvent?.ticketLink}
              </a>
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Sponsors:
            </Typography>
            <List>
              {selectedEvent?.sponsors.map((sponsor: string, index: number) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={sponsor} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions sx={{paddingBottom: 3 }}>
            <Button
              onClick={handleCloseDialog}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default App;
