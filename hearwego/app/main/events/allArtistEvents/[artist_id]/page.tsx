"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useParams } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleEvent from "@/app/components/SingleEvent";
import { getUpcomingEventsSortByDate } from "@/app/services/EventServices";
import { getAllArtists } from "@/app/services/ArtistServices";
import { Event } from "@/app/constants/models";
import { Artist } from "@/app/constants/models";
import { getUpcomingEventsForGivenArtistByFan } from "@/app/services/EventServices";
import { Maindiv, SearchPaper } from "../../../../styles/eventsMW.styles";
import { Pagination, Typography } from "@mui/material";

export default function MoreAlbums() {
    const { artist_id } = useParams();
  const [allEvents, setAllEvents] = React.useState<Event[]>([]);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageCount, setPageCount] = React.useState(0);

//   React.useEffect(() => {
//     getUpcomingEventsSortByDate(page, limit).then((events) => {
//       console.log("Events......", events);
//       setAllEvents(events.data);
//       setPageCount(Math.ceil(events.total / limit));
//     });
//   }, [page, allEvents.length]);

  React.useEffect(() => {
    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  React.useEffect(() => {
    if (artist_id) {
      getUpcomingEventsForGivenArtistByFan(page, limit, artist_id as string).then(
        (events) => {
          setAllEvents(events.data);
          setPageCount(Math.ceil(events.total / limit));
        }
      );
    }
  }, [artist_id, page, allEvents.length]);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredEvents = allEvents.filter((event) => {
    const artistName = getArtistName(event.event_created_by).toLowerCase();
    const eventName = event.event_name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return eventName.includes(query) || artistName.includes(query);
  });
  return (
    <Maindiv>
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
          display: "flex",
          alignItems: "center",
          //backgroundColor: "yellow",
        }}
      >
        <Typography variant="h4">
        Events of 
        </Typography>
        <Typography variant="h4" fontWeight={600} color="secondary" sx={{ml: 2, fontSize: "1.5em"}}>
            {getArtistName(artist_id)}
        </Typography>
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
