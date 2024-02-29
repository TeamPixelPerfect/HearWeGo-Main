"use client";

import { ADHomeTabBox } from "@/app/styles/artistDashboard.styles";
import { EventMainBox } from "@/app/styles/artistDashboardEventsPage.styles";
import { Card, Grid, Tab, Tabs, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const ArtistSongs = () => {
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh" }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            color: theme.palette.secondary.main,
            padding: "1em",
            paddingBottom: 0,
          }}
        >
          Songs
        </Typography>
        <ADHomeTabBox>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Popular" />
            <Tab label="Recent" />
            <Tab label="Upcoming" />
          </Tabs>
        </ADHomeTabBox>
      </Card>
    </Grid>
  );
};

export default ArtistSongs;
