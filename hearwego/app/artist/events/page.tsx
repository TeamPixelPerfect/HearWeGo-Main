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

import ArtistSingleEvent from "../../components/ArtistDashboardSingleEvent";

import {
  EventMainBox,
  TopBar,
  TabBar,
  BtnSec,
  EventSec,
  EventDetailRow,
} from "../../styles/artistDashboardEventsPage.styles";

export default function ArtistEvents() {
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
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div"></Typography>
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

const singleEventDetails = [
  {
    event_name: "Nadagama",
    event_image: "https://shorturl.at/qxDV8",
    event_date: "2024-01-10",
    event_time: "8.00 P.M.",
    event_interest: "1000",
  },
  {
    event_name: "Ridma",
    event_image: "https://shorturl.at/qxDV8",
    event_date: "2024-04-10",
    event_time: "9.00 P.M.",
    event_interest: "1000",
  },
  {
    event_name: "Ridma",
    event_image: "https://shorturl.at/qxDV8",
    event_date: "2024-04-10",
    event_time: "9.00 P.M.",
    event_interest: "1000",
  },
  {
    event_name: "Ridma",
    event_image: "https://shorturl.at/qxDV8",
    event_date: "2024-04-10",
    event_time: "9.00 P.M.",
    event_interest: "1000",
  },
  {
    event_name: "Ridma",
    event_image: "https://shorturl.at/qxDV8",
    event_date: "2024-04-10",
    event_time: "9.00 P.M.",
    event_interest: "1000",
  },
  {
    event_name: "Ridma",
    event_image: "https://shorturl.at/qxDV8",
    event_date: "2024-04-10",
    event_time: "9.00 P.M.",
    event_interest: "1000",
  },
  {
    event_name: "Ridma",
    event_image: "https://shorturl.at/qxDV8",
    event_date: "2024-04-10",
    event_time: "9.00 P.M.",
    event_interest: "1000",
  },
];

function EventArea() {
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
        <Grid
          container
          columnGap={5}
          rowGap={2}
          sx={{  width: "100%" }}
        >
          {singleEventDetails.map(
            ({
              event_name,
              event_image,
              event_date,
              event_time,
              event_interest,
            }) => (
              <Grid item xs={4} md={2} spacing={10} style={{ }}>
                <EventCard
                  event_name={event_name}
                  event_image={event_image}
                  event_date={event_date}
                  event_time={event_time}
                  event_interest={event_interest}
                ></EventCard>
              </Grid>
            )
          )}
        </Grid>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Pagination count={10} color="primary" />
      </Box>
    </>
  );
}

interface Props {
  event_name: string;
  event_image: string;
  event_date: string;
  event_time: string;
  event_interest: string;
}

function EventCard({
  event_name,
  event_image,
  event_date,
  event_time,
  event_interest,
}: Props) {
  return (
    <Box sx={{ width: 230 }}>
      <Card sx={{ width: "100%" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={event_image} />
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
              {event_interest}
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
