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


import ArtistSingleEvent from '../../components/ArtistDashboardSingleEvent'


import {
  EventMainBox,
  TopBar,
  TabBar,
  BtnSec,
  EventSec,
} from "../../styles/artistDashboardEventsPage.styles";

export default function ArtistEvents() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <EventMainBox>
      <TopBar>
        <TabBar>
          <Tabs value={value} onChange={handleChange}>
            <Tab icon={<CalendarMonthIcon />} label="UPCOMING" />
            <Tab icon={<TrendingUpIcon />} label="POPULAR" />
            <Tab icon={<CallMissedIcon />} label="PAST" />
            <Tab icon={<DraftsIcon />} label="DRAFTS" />
            <Tab icon={<PeopleIcon />} label="OTHERS" />
          </Tabs>
        </TabBar>

        <BtnSec>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create New Event
          </Button>
        </BtnSec>
      </TopBar>

      <EventSec>

        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />
        <ArtistSingleEvent />

        {/* ------------------------------------------------------ */}
        

      </EventSec>
    </EventMainBox>
  );
}

// export default ArtistEvents;
