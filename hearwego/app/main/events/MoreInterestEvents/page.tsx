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
import { Pagination, Typography } from "@mui/material";
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
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    getInterestedEventsByUser(page, limit, user?.user_id).then((events) => {
      console.log("Events......", events);
      setInterestEvents(events);
      setPageCount(Math.ceil(events.total / limit));
    });
  }, [user, page, interestEvents.length]);

  React.useEffect(() => {
    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredEvents = interestEvents.filter((event) => {
    const artistName = getArtistName(event.event_created_by).toLowerCase();
    const eventName = event.event_name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return eventName.includes(query) || artistName.includes(query);
  });

  return (
    <Maindiv sx={{ height: "100%", marginBottom: 0}}>
      <Box sx={{ width: "100%", p: 5 }}>
        <InputBase
          placeholder="Search Events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "80%",
            padding: "5px 10px",
            borderRadius: "4px",
          }}
          startAdornment={<SearchIcon sx={{ marginRight: "8px" }} />}
        />
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
        {filteredEvents.length > 0 ? (
          filteredEvents.map(
            ({
              event_id,
              event_name,
              event_img,
              sessions,
              event_created_by,
            }) => (
              <Grid item xs={6} md={3}>
                <SingleEvent
                  eventID={event_id}
                  eventName={event_name}
                  eventImg={event_img}
                  artistName={getArtistName(event_created_by)}
                  noOfSessions={sessions?.length}
                ></SingleEvent>
              </Grid>
            )
          )
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              color="secondary"
              variant="subtitle1"
              sx={{ fontStyle: "italic" }}
            >
              No Events Found
            </Typography>
          </Box>
        )}
      </Grid>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1em",
          marginBottom: "5em",
        }}
      >
        <Pagination
          count={pageCount}
          color="primary"
          page={page}
          onChange={handlePageChange}
          sx={{marginBottom: "5em"}}
        />
      </Box>
    </Maindiv>
  );
}
