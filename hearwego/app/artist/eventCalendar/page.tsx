"use client";
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "./eventCalendar.css";

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
  const [value, onChange] = useState<Value>(new Date());

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
            <Calendar onChange={onChange} value={value} style={{background:"#000"}}/>
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
              <EventCard
                date="05"
                day="Monday"
                eventName="Event Name"
                month="January 2024"
              />
              <EventCard
                date="08"
                day="Thursday"
                eventName="Event Name"
                month="January 2024"
              />
              <EventCard
                date="10"
                day="Sunday"
                eventName="Event Name"
                month="January 2024"
              />
              <EventCard
                date="01"
                day="Saturday"
                eventName="Event Name"
                month="February   2024"
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ArtistEventCalendar;
