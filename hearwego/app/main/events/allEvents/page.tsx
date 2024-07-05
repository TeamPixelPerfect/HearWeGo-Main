"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleEvent from "@/app/components/SingleEvent";
import { getUpcomingEventsSortByDate } from "@/app/services/EventServices";
import { getAllArtists } from "@/app/services/ArtistServices";
import { Event } from "@/app/constants/models";
import { Artist } from "@/app/constants/models";

import { Maindiv, SearchPaper } from "../../../styles/eventsMW.styles";
import { Pagination } from "@mui/material";

export default function MoreAlbums() {
  const [allEvents, setAllEvents] = React.useState<Event[]>([]);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);
  const [pageCount, setPageCount] = React.useState(0);

  React.useEffect(() => {
    getUpcomingEventsSortByDate(page, limit).then((events) => {
      console.log("Events......",events);
      setAllEvents(events.data);
      setPageCount(Math.ceil(events.total / limit));
    });
  }
  , [page, allEvents.length]);

  React.useEffect(() => {
    getAllArtists().then((artists) => {
      console.log("Artists......",artists);
      setArtists(artists.data);
    });
  }
  , []);

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.artistName : 'Unknown';
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Maindiv>
      <Box
        style={{
          display: "flex",
          padding: "15px",
        }}
      >
        <SearchPaper>
          <InputBase
            sx={{ ml: 5, flex: 1 }}
            placeholder="Search Events"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
            <SearchIcon />
          </IconButton>
            
        </SearchPaper>
      </Box>
      <Box
        style={{
          padding: "10px 0px 0px 60px",
          color: "primary.default",
          fontSize: "32px",
          fontWeight: "bold",
          //backgroundColor: "yellow",
        }}
      >
        All Events
      </Box>
      <Grid container spacing={2} sx={{ margin: "1em auto", width: "95%" }}>
        {allEvents.map(({ event_id, event_name, event_img, sessions, event_created_by }) => (
          <Grid item xs={6} md={3}>
            <SingleEvent
              eventID={event_id}
              eventName={event_name}
              eventImg={event_img}
              artistName={getArtistName(event_created_by)}
              noOfSessions={sessions?.length}
            ></SingleEvent>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        <Pagination
          count={pageCount}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Maindiv>
  );
}
