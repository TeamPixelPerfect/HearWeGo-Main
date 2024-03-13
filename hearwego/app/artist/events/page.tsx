"use client";
import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import DraftsIcon from "@mui/icons-material/Drafts";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea, CardActions, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PaidIcon from "@mui/icons-material/Paid";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Event } from "@/app/constants/models";

import ArtistSingleEvent from "../../components/ArtistDashboardSingleEvent";

import {
  EventMainBox,
  TopBar,
  TabBar,
  BtnSec,
  EventSec,
  EventDetailRow,
} from "../../styles/artistDashboardEventsPage.styles";
import { getEvents } from "@/app/services/EventServices";

export default function ArtistEvents() {
  const [eventDetails, setEventDetails] = useState([]);

  useEffect(() => {
    // Fetch event data from the API route
    fetch("http://localhost:5000/api/EventsManager/events")
      .then((response) => response.json())
      .then((data) => setEventDetails(data))
      .catch((error) => console.error("Error fetching event data:", error));
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Card variant="outlined">{EventsDisplay}</Card>
      </Box>
    </>
  );
}

const EventsDisplay = (
  <React.Fragment>
    <CardContent>
      <Box sx={{ width: "100%" }}>
        <EventTabs />
      </Box>
    </CardContent>
  </React.Fragment>
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function EventTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<CalendarMonthIcon />}
            label="Upcoming"
            {...a11yProps(0)}
          />
          <Tab icon={<TrendingUpIcon />} label="Popular" {...a11yProps(1)} />
          <Tab icon={<CallMissedIcon />} label="Past" {...a11yProps(2)} />
          <Tab icon={<DraftsIcon />} label="Drafts" {...a11yProps(3)} />
          <Tab icon={<PeopleIcon />} label="Other" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <EventArea />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Five
      </CustomTabPanel>
    </Box>
  );
}


function EventArea() {
  const artist = useAppSelector((state) => state.artist.user);

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (artist?.token) {
      getEvents(artist?.token, page, limit).then((events) => {
        console.log("Events:::", events);
        setUpcomingEvents(events.data);
      });
    }
  }, [page]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <Typography
          variant="h5"
          color="secondary.main"
          component="div"
          sx={{ fontWeight: 500 }}
        >
          My Upcoming Events
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New Event
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid container columnGap={5} rowGap={2} sx={{ width: "100%" }}>
          {upcomingEvents.map((events, index) => {
            return events.sessions?.map((event) => (
              <Grid item xs={4} md={2} spacing={10} style={{}}>
                <EventCard
                  event_name={events.event_name}
                  event_date={event.session_date}
                  event_time={event.session_time}
                  event_img={events.event_img}
                ></EventCard>
              </Grid>
            ));
          })}
        </Grid>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Pagination count={10} color="primary" />
      </Box>
    </>
  );
}

interface EventCardProps {
  event_name: string;
  event_img: string;
  event_date: string;
  event_time: string;
  no_of_interests?: number;
}

function EventCard({
  event_name,
  event_img,
  event_date,
  event_time,
  no_of_interests,
}: EventCardProps) {
  return (
    <Box sx={{ width: 230 }}>
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={event_img} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <EventDetailRow direction="row" spacing={10}>
                <CalendarMonthIcon />
                {event_date}
              </EventDetailRow>
              <EventDetailRow direction="row" spacing={10}>
                <AccessTimeFilledIcon />
                {event_time}
              </EventDetailRow>
              <EventDetailRow direction="row" spacing={10}>
                <FavoriteIcon />
                {0}
              </EventDetailRow>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="ticket">
              <LocalActivityIcon />
            </IconButton>
            <IconButton aria-label="budget">
              <PaidIcon />
            </IconButton>
            <IconButton aria-label="add to shopping cart">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}
