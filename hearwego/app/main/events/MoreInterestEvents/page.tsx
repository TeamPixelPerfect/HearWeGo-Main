"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleEvent from "@/app/components/SingleEvent";
import { getInterestedEventsByUser } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import { Artist } from "@/app/constants/models";
import { Pagination } from "@mui/material";
import { getAllArtists } from "@/app/services/ArtistServices";
import { useAppSelector } from "@/lib/hooks";

import { Maindiv, SearchPaper } from "../../../styles/eventsMW.styles";


export default function MoreAlbums() {
  const user = useAppSelector((state) => state.user.user);
  const [interestEvents, setInterestEvents] = React.useState<Event[]>([]);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);
  const [pageCount, setPageCount] = React.useState(0);

  React.useEffect(() => {
    getInterestedEventsByUser(page, limit, user?.user_id).then((events) => {
      console.log("Events......",events);
      setInterestEvents(events);
      setPageCount(Math.ceil(events.total / limit));
    });
  }
  , [user, page, interestEvents.length]);

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
        Interest Events
      </Box>
      <Grid container spacing={2} sx={{ margin: "1em auto", width: "95%" }}>
        {interestEvents.map(({ event_id, event_name, event_img, sessions, event_created_by }) => (
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
