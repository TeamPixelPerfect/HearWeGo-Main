"use client";
import {
  Box,
  Card,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./eventCalendar.css";
import { Event } from "../../constants/models";
import { getEvents } from "../../services/EventServices";
import { useAppSelector } from "@/lib/hooks";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface EventCardProps {
  date: string;
  day: string;
  eventName: string;
  sessionName: string;
  month: string;
}

const EventCard = ({
  date,
  day,
  month,
  eventName,
  sessionName,
}: EventCardProps) => {
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
        <Typography
          variant="h4"
          sx={{ color: "#fff", textAlign: "center" }}
        >
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
        <Typography variant="subtitle2" sx={{ color: "#fff" }}>
          {sessionName}
        </Typography>
      </Box>
    </Grid>
  );
};

const ArtistEventCalendar = () => {
  const theme = useTheme();
  const artist = useAppSelector((state) => state.artist.user);
  const [value, onChange] = useState<Value>(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [highlightDates, setHighlightDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (artist?.token) {
      getEvents(1, 5, "event_created_by", artist.artist_id).then(
        (events) => {
          setUpcomingEvents(events.data);
          setHighlightDates(
            events.data.flatMap((event) =>
              event.sessions.map(
                (session) => new Date(session.session_date)
              )
            )
          );
        }
      );
    }
  }, [artist]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter and sort sessions based on selectedDate and exclude past dates
  const filteredSessions = upcomingEvents
    .flatMap((event) =>
      event.sessions?.filter(
        (session) => {
          const sessionDate = new Date(session.session_date);
          return selectedDate &&
            sessionDate.toDateString() === selectedDate.toDateString() &&
            sessionDate >= today;
        }
      )?.map((session) => ({
        ...session,
        eventName: event.event_name,
      })) || []
    )
    .sort((a, b) => new Date(a.session_date).getTime() - new Date(b.session_date).getTime());

  const handleDateChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
    }
  };

  const handleClearSelection = () => {
    setSelectedDate(null);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
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
          {selectedDate && (
            <Typography
              variant="body1"
              sx={{ cursor: "pointer", color: theme.palette.primary.main }}
              onClick={handleClearSelection}
            >
              Clear Selection
            </Typography>
          )}
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
                view === "month" && date < today
                  ? "past"
                  : view === "month" &&
                    highlightDates.some(
                      (d) => d.toDateString() === date.toDateString()
                    )
                  ? "highlight"
                  : ""
              }
              onClickDay={handleDateChange}
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
              {selectedDate
                ? `Sessions on ${selectedDate.toLocaleDateString()}`
                : "Upcoming Events"}
            </Typography>
            <Box
              sx={{
                maxHeight: "calc(100vh - 250px)", // Adjust this value as needed
                overflowY: "auto",
                paddingRight: "1em", // Add padding for scrollbar space
              }}
            >
              <Grid container>
                {selectedDate
                  ? filteredSessions.map((session) => (
                      <EventCard
                        key={session.session_id}
                        date={new Date(session.session_date)
                          .getDate()
                          .toString()}
                        day={new Date(session.session_date).toLocaleString(
                          "en-US",
                          { weekday: "long" }
                        )}
                        month={new Date(session.session_date).toLocaleString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}
                        eventName={session.eventName}
                        sessionName={session.session_name}
                      />
                    ))
                  : upcomingEvents
                      .flatMap(event => event.sessions)
                      .filter(session => new Date(session.session_date) >= today)
                      .sort((a, b) => new Date(a.session_date).getTime() - new Date(b.session_date).getTime())
                      .map((session) => (
                        <EventCard
                          key={session.session_id}
                          date={new Date(session.session_date)
                            .getDate()
                            .toString()}
                          day={new Date(session.session_date).toLocaleString(
                            "en-US",
                            { weekday: "long" }
                          )}
                          month={new Date(session.session_date).toLocaleString(
                            "en-US",
                            { month: "long", year: "numeric" }
                          )}
                          eventName={upcomingEvents.find(event => event.sessions.includes(session))?.event_name}
                          sessionName={session.session_name}
                        />
                      ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ArtistEventCalendar;
