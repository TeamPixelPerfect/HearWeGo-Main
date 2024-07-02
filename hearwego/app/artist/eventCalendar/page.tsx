"use client";
import {
  Box,
  Card,
  Grid,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "./eventCalendar.css";
import { Event } from "../../constants/models";
import { getEvents } from "../../services/EventServices";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface EventCardProps {
  date: string;
  day: string;
  eventName: string;
  month: string;
}

const EventCard = ({ date, day, month, eventName }: EventCardProps) => {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        alignItems: "center",
        background: theme.palette.primary.main,
        padding: "1em",
        marginBottom: "1em",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Typography variant="h4" sx={{ color: "#fff", textAlign: "center" }}>
          {date}
        </Typography>
      </Box>
      <Box sx={{ width: "40%" }}>
        <Typography variant="subtitle1" sx={{ color: "#fff" }}>
          {month}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#fff" }}>
          {day}
        </Typography>
      </Box>
      <Box sx={{ width: "30%" }}>
        <Typography variant="h5" sx={{ color: "#fff" }}>
          {eventName}
        </Typography>
      </Box>
    </Grid>
  );
};

const ArtistEventCalendar = () => {
  const theme = useTheme();
  const artist = useAppSelector((state) => state.artist.user);
  const [page, setPage] = useState(1);
  const eventsPerPage = 4;
  const [limit, setLimit] = useState(5);
  const [value, onChange] = useState<Value>(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [highlightDates, setHighlightDates] = useState<Date[]>([]);

  useEffect(() => {
    if (artist?.token) {
      getEvents(page, limit, "event_created_by", artist.artist_id).then(
        (events) => {
          setUpcomingEvents(events.data);
          setHighlightDates(
            events.data.flatMap((event) =>
              event.sessions.map((session) => new Date(session.session_date))
            )
          );
        }
      );
    }
  }, [artist]);

  const indexOfLastEvent = page * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = upcomingEvents
    .flatMap((event) => event.sessions)
    .slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
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
            padding: "1em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: theme.palette.secondary.main,
            }}
          >
            Event Calendar
          </Typography>
        </Box>
        <Grid container sx={{ width: "100%" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "2em",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Calendar
              onChange={onChange}
              value={value}
              tileClassName={({ date, view }) =>
                view === "month" &&
                highlightDates.some(
                  (d) => d.toDateString() === date.toDateString()
                )
                  ? "highlight"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ padding: "1em 2em" }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: theme.palette.secondary.main,
                marginBottom: "1em",
              }}
            >
              Upcoming Events
            </Typography>
            <Grid container>
            {currentEvents.map(session => (
    <EventCard
      key={session.session_id}
      date={new Date(session.session_date).getDate().toString()}
      day={new Date(session.session_date).toLocaleString('en-US', { weekday: 'long' })}
      month={new Date(session.session_date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
      eventName={session.session_name}
    />
  ))}
            </Grid>
            <Pagination
              count={Math.ceil(
                upcomingEvents.flatMap((event) => event.sessions).length /
                  eventsPerPage
              )}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{ marginTop: "1em" }}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ArtistEventCalendar;
